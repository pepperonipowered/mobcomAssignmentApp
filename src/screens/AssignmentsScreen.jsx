import { View, Text } from 'react-native'
import React from 'react'
import CustomTopBar from '../components/CustomTopBar'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomNavigationBar from '../components/CustomNavigationBar';

import AddAssignment from '../components/Assignments/AddAssignment';
import AssignmentDetails from '../components/Assignments/AssignmentDetails';
import AssignmentList from '../components/Assignments/AssignmentList';

const Stack = createNativeStackNavigator();

const AssignmentsScreen = () => {
    return (
        <>
            {/* <CustomTopBar title={`Assignments`} /> */}
            <Stack.Navigator
                initialRouteName="Assignment List"
                screenOptions={{
                    header: (props) => <CustomNavigationBar {...props} />,
                }}
                name='AssignmentStack'
            >
                <Stack.Screen name="Assignment List" component={AssignmentList} />
                <Stack.Screen name="Add Assignment" component={AddAssignment} />
                <Stack.Screen name="Assignment Details" component={AssignmentDetails} />
                {/* <Stack.Screen name="EditAssignment" component={EditAssignment} /> */}
            </Stack.Navigator>
        </>
    )
}

export default AssignmentsScreen