import { FlatList, View } from 'react-native'
import { Portal, FAB, Text, Button, MD3Colors, ActivityIndicator } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import AssignmentItem from './AssignemntItem'
import { FIREBASE_DB } from '../../../firebaseConfig'
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore'
import { useRoute } from '@react-navigation/native'

const assignmentsRef = collection(FIREBASE_DB, 'assignments');


/*
  missing:
    notification
    subject input
    analytics
*/

const AssignmentList = ({
  navigation
}) => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true);
  const [fab, setFab] = useState(false);

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
      <Portal>
        <FAB.Group
          style={{ position: 'absolute', bottom: 0, right: 0, paddingBottom: 90, paddingRight: 5 }}
          open={fab}
          visible
          icon={fab ? 'close' : 'plus'}
          label='Add an item'
          actions={[
            { 
              icon: 'format-list-bulleted', 
              label: 'Add an assignment',
              onPress: () => {navigation.navigate("Add Assignment")} 
            },
            {
              icon: 'book',
              label: 'Add a subject',
              onPress: () => {navigation.navigate("Add Subject")},
            },
          ]}
          onStateChange={() => setFab(!fab)}
          onPress={() => {
            if (fab) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </>
  )
}

export default AssignmentList