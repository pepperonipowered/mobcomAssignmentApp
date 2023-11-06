import { View, Text } from 'react-native'
import React from 'react'
import CustomTopBar from '../components/CustomTopBar'

const SettingsScreen = () => {
  return (
    <View>
      <CustomTopBar title={`Settings`} />
      <Text>SettingsScreen</Text>
    </View>
  )
}

export default SettingsScreen