import { FlatList, View } from 'react-native'
import { Text, MD3Colors, ActivityIndicator } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import AssignmentItem from './AssignemntItem'
import { FIREBASE_DB } from '../../../firebaseConfig'
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore'
import { useRoute } from '@react-navigation/native'
import FloatingActionButton from '../FloatingActionButton'


const assignmentsRef = collection(FIREBASE_DB, 'assignments');


const AssignmentList = ({
  navigation
}) => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true);
  

  const location = useRoute();

  useEffect(() => {
    // subscribe = get data from the database real-time
    const subscribe = onSnapshot( 
    query(
      assignmentsRef,
      where("status", "==", false),
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
    
    <View style={{flex: 1 }}>
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
       <FloatingActionButton navigation={navigation} />
    </>
  )
}

export default AssignmentList