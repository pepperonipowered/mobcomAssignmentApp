import { View, Text } from 'react-native'
import React from 'react'
import CustomTopBar from '../components/CustomTopBar'

const AnalyticsScreen = () => {
  return (
    <View>
      <CustomTopBar title={`Analytics`} />
      <Text>AnalyticsScreen</Text>
    </View>
  )
}

export default AnalyticsScreen