import { View, Text } from 'react-native'
import React from 'react'
import CustomTopBar from '../components/CustomTopBar'

const CompletedScreen = () => {
  return (
      <View>
        <CustomTopBar title={`Completed`} />
        <Text>CompletedScreen</Text>
      </View>
  )
}

export default CompletedScreen