import { FlatList, View } from 'react-native'
import { Portal, FAB, Text, Button, MD3Colors, ActivityIndicator } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { FIREBASE_DB } from '../../firebaseConfig'
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore'
import CustomTopBar from '../components/CustomTopBar'
import AssignmentItem from '../components/Assignments/AssignemntItem'


const assignmentsRef = collection(FIREBASE_DB, 'assignments');

const CompletedScreen = ({navigation}) => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // subscribe = get data from the database real-time
    const subscribe = onSnapshot( 
    query(
      assignmentsRef,
      where("status", "==", true),
    ), {
      next: (snapshot) => {
        const assignments = [];
        snapshot.docs.map((doc) => {
          assignments.push({id: doc.id, ...doc.data()})
        })
        setAssignments(assignments)
        setLoading(false)
        console.log(assignments)
    }})
    // got all data? then unsubscribe from the connection
    return () => subscribe();
  }, [])

  console.log("Assignments: ", assignments)
  return (
      <>
        <CustomTopBar title={`Completed`} />
          <View style={{ flex: 1, }}>
            {loading ? 
              (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                  <ActivityIndicator animating={true} color={MD3Colors.primary50} size={'large'} style={{ marginBottom: 5 }} />
                  <Text variant='titleMedium'>Loading assignments...</Text>
                </View>
              )
              :(
                <FlatList
                  data={assignments}
                  renderItem={(item) => <AssignmentItem assignment={item} navigation={navigation}/>}
                  keyExtractor={(assignment) => assignment.id}
                />
              )
            }
        </View>
      </>
  )
}

export default CompletedScreen