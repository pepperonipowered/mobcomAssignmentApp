import { View, Text } from 'react-native'
import React from 'react'
import CustomTopBar from '../components/CustomTopBar'

const AssignmentsScreen = () => {
    return (
        <View>
            <CustomTopBar title={`Assignments`}/>
            <Text>AssignmentsScreen</Text>
        </View>
    )
}

export default AssignmentsScreen