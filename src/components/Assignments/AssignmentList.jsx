import { FlatList, View } from 'react-native'
import { Portal, FAB, Text, Button, MD3Colors, ActivityIndicator } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import AssignmentItem from './AssignemntItem'
import { FIREBASE_DB } from '../../../firebaseConfig'
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore'

const assignmentsRef = collection(FIREBASE_DB, 'assignments');

const AssignmentList = ({
  navigation
}) => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // subscribe = get data from the database real-time
    const subscribe = onSnapshot(assignmentsRef, 
    query(
      assignmentsRef, 
      where('status', '==', false),
      orderBy('createdAt', 'desc')
    ),
    {
      next: (snapshot) => {
        const assignments = [];
        snapshot.docs.map((doc) => {
          assignments.push({id: doc.id, ...doc.data()})
        })
        setAssignments(assignments)
        setLoading(false)
      }
    })
    // got all data? then unsubscribe from the connection
    return () => subscribe();
  }, [])

  console.log("Assignments: ", assignments)

  return (
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
              renderItem={(item) => <AssignmentItem assignment={item}/>}
              keyExtractor={(assignment) => assignment.id}
            />
          )
        }
        
        <Portal.Host>
          <View style={{ position: 'absolute', right: 0, bottom: 0, paddingBottom: 20, paddingRight: 20 }}>
            <FAB
                icon="plus"
                onPress= { () => {navigation.navigate("Add Assignment")} }
            />
          </View>
        </Portal.Host>
    </View>
  )
}

export default AssignmentList