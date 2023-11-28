import * as SQLite from 'expo-sqlite'
import { useState } from 'react';
import {useForceRefresh} from './useForceRefresh';

const db = SQLite.openDatabase('assignmentApp.db');

const [forceRefresh, forceRefreshId] = useForceRefresh();



const dropAssignmentTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE IF EXISTS assignment',
            [],
            () => {
                console.log('Assignment table dropped successfully.');
            },
            (error) => {
                console.log('Assignment table dropped unsuccessfully. SQLite error:', error);
            },
        );   
    });
}

const createAssignmentTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS assignment (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), dueDate DATE, notifMins INTEGER, status BOOLEAN)',
            [],
            () => {
                console.log('Assignment table created successfully.');
            },
            (error) => {
                console.log('Assignment table created unsuccessfully. SQLite error:', error);
            },
        );   
    });
}

const addAssignment = (title, dueDate, dueTime, notifTime, callback, refresh ) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'INSERT INTO assignment (title, dueDate, notifMins, status) VALUES (?, ?, ?, ?)',
                [title, dueDate, notifTime, 0],
                (txObj, resultSet) => {
                    console.log('Assignment added.');
                    callback();
                },
                (txObj, error) => {
                    console.log('Insert error:', error);
                    console.log('Failed SQL statement:', error.sqlStatement);
                    console.log('SQL statement parameters:', error.sqlParams);
                }
            );
        },
        null,
        forceRefresh
    );
};

const updateAssignment = (id, title, dueDate, dueTime, notifTime, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE assignment SET title = ?, dueDate = ?, dueTime = ?, notifMins = ? WHERE id = ?',
      [title, dueDate, dueTime, notifTime, id],
      () => {
        callback();
        console.log('Assignment updated.')
      },
      (error) => {
        console.log('Error updating item:', error);
      }
    );
  });
};

const updateAssignmentStatus = (id, assignStatus, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'UPDATE assignment SET status = ? WHERE id = ?',
        [assignStatus, id],
        () => {
          callback();
          console.log('Updated')
        },
        (txObj, error) => {
          console.log('Update assignment status error:', error);
        }
      );
    }
  );
};

const getCompletedAssignments = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM assignment WHERE status = 1',
        [],
        (_, { rows: { _array } }) => callback(_array)
        // (txObj, resultSet) => {
        //   const items = [];
        //   for (let i = 0; i < resultSet.rows.length; i++) {
        //     items.push(resultSet.rows.item(i)); 
        //   }
        //   callback(items);
        // },
        // (txObj, error) => {
        //   console.log('Select error:', error);
        // }
      );
    }
  );
};

const getNotCompletedAssignments = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM assignment WHERE status = 0 ORDER BY id DESC',
        [],
        (txObj, resultSet) => {
          const items = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            items.push(resultSet.rows.item(i)); 
          }
          callback(items);
        },
        (txObj, error) => {
          console.log('Error getting uncompleted assignments:', error);
        }
      );
    }
  );
};

const getAssignmentById = (id, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM assignment WHERE id = ?',
        [id],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            const item = resultSet.rows.item(0);
            callback(item);
          } else {
            console.log(`No item found with ID ${id}`);
            callback(null);
          }
        },
        (txObj, error) => {
          console.log('Select error:', error);
        }
      );
    }
  );
};

const deleteAssignment = (id, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM assignment WHERE id = ?',
        [id],
        () => {
          callback();
        },
        (error) => {
          console.log('Error deleting assignment:', error);
        }
      );
    }
  );
};

const printDatabaseContents = () => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM assignment', null,
            (txObj, resultSet) => {
                const rows = resultSet.rows;
                for (let i = 0; i < rows.length; i++) {
                    const item = rows.item(i);
                    console.log(`Assignment ID: ${item.id}, Title: ${item.title}, Due date: ${item.dueDate}, Due time: ${item.dueTime}, Notification minutes: ${item.notifMins}, Status: ${item.status},`);
                }
            },
            (txObj, error) => console.log(error)
        );
    });
};

export {
  printDatabaseContents,
  dropAssignmentTable,
  createAssignmentTable,
  addAssignment,
  updateAssignment,
  updateAssignmentStatus,
  getCompletedAssignments,
  getNotCompletedAssignments,
  getAssignmentById,
  deleteAssignment,
  db
};