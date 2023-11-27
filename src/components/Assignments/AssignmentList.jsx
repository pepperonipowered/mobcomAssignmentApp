import { FlatList, View } from 'react-native'
import { Portal, FAB, Text, Button, MD3Colors } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { 
  dropAssignmentTable, 
  printDatabaseContents,
  getNotCompletedAssignments,
  getCompletedAssignments,
  createAssignmentTable,
  db
} from '../../lib/AssignmentsCRUD'
import AssignmentItem from './AssignemntItem'


const AssignmentList = ({
  navigation
}) => {
  const [assignments, setAssignments] = useState([])

  
  // dev functions for db
  const restartDB = () => {
    db.closeAsync();
    console.log('Database closed.')
  }
  const clearDB = () => {
    dropAssignmentTable();
  }
  const deleteDB = () => {
    db.deleteAsync();
    console.log('Database deleted.')
  }
  useEffect(() => {
    createAssignmentTable();
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items where done = 0;`,
        [],
        (_, { rows: { _array } }) => {setAssignments(_array)}
      );
    });
    printDatabaseContents();
  },[])
  console.log("Assignments: ", assignments)
  return (
    <View style={{ flex: 1, }}>
        <Portal.Host>
          <View style={{ position: 'absolute', right: 0, bottom: 0, paddingBottom: 20, paddingRight: 20 }}>
            <FAB
                icon="plus"
                onPress= { () => {navigation.navigate("Add Assignment")} }
            />
          </View>
        </Portal.Host>
        <FlatList
          data={assignments}
          renderItem={(assignment) => <AssignmentItem/>}
          keyExtractor={(assignment) => assignment.id}
        />
        <Button
          mode="contained"
          style={{ borderRadius:5, backgroundColor: MD3Colors.primary50, marginRight: 20 }}
          onPress={() => {
            restartDB()
          }}
        >Close Db</Button>
        <Button
          mode="contained"
          style={{ borderRadius:5, backgroundColor: MD3Colors.primary50, marginRight: 20 }}
          onPress={() => {
            clearDB()
          }}
        >Clear Db</Button>
        <Button
          mode="contained"
          style={{ borderRadius:5, backgroundColor: MD3Colors.primary50, marginRight: 20 }}
          onPress={() => {
            deleteDB()
          }}
        >Delete Db</Button>
    </View>
  )
}

export default AssignmentList