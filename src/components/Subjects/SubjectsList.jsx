import { FlatList, View } from 'react-native'
import { Portal, FAB, Text, Button, MD3Colors, ActivityIndicator } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import SubjectItem from './SubjectItem'
import { FIREBASE_DB } from '../../../firebaseConfig'
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore'

const subjectsRef = collection(FIREBASE_DB, 'subjects');


export default function SubjectsList ({ navigation }) {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // subscribe = get data from the database real-time
      const subscribe = onSnapshot( subjectsRef, {
        next: (snapshot) => {
          const subjects = [];
          snapshot.docs.map((doc) => {
            subjects.push({id: doc.id, ...doc.data()})
          })
          setSubjects(subjects)
          setLoading(false)
      }})
      // got all data? then unsubscribe from the connection
      return () => subscribe();
    }, [])

    return(
      <View style={{ flex: 1, }}>
        {loading ? 
          (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
              <ActivityIndicator animating={true} color={MD3Colors.primary50} size={'large'} style={{ marginBottom: 5 }} />
              <Text variant='titleMedium'>Loading subjects...</Text>
            </View>
          )
          :(
            <FlatList
              data={subjects}
              renderItem={(item) => <SubjectItem subject={item} navigation={navigation}/>}
              keyExtractor={(subject) => subject.id}
            />
          )
        }
    </View>
    
    )
}
