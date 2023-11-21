import { View, FlatList } from 'react-native'
import { Portal, FAB, Text } from 'react-native-paper'
import React from 'react'
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
  return (
    <View style={{ flex: 1, }}>
        {/* <FlatList
          data={assignments}
          renderItem={(assignment) => <AssignemntItem navigation={navigation} assignment={assignment} />}
          keyExtractor={assignment => assignment.id}
        /> */}
        {assignments.map((assignment) => (
          <AssignemntItem navigation={navigation} assignment={assignment} />
        ))}
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