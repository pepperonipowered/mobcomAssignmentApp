import { View } from 'react-native'
import { Portal, FAB, Text } from 'react-native-paper'
import React from 'react'

const AssignmentList = ({
  navigation
}) => {
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
    </View>
  )
}

export default AssignmentList