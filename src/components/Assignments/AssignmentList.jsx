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

import AssignemntItem from './AssignemntItem'
// import { assignments } from '../../lib/mock_assignments'

const assignments = [
  {
      id:1,
      title:"Make It Happen",
      description:"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
      date:"4/28/2023",
      mins:45,
      isCompleted:true,
      createdAt:"3/27/2023",
      updatedAt:"11/7/2023"
  },
]
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
        `SELECT * FROM assignment where status = 0`,
        [],
        (_, { rows: { _array } }) => {setAssignments(_array)}
      );
    });
    printDatabaseContents();
  },[])
  console.log("Assignments: ", assignments)
  return (
    <View style={{ flex: 1, }}>
        {/* <FlatList
          data={assignments}
          renderItem={(assignment) => <AssignemntItem navigation={navigation} assignment={assignment} />}
          keyExtractor={assignment => assignment.id}
        /> */}
        {assignments.map((assignment) => (
          <AssignemntItem navigation={navigation} assignment={assignment} key={assignment.id}/>
        ))}
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