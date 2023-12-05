import { View, Text } from 'react-native'
import React from 'react'
import CustomTopBar from '../components/CustomTopBar'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomNavigationBar from '../components/CustomNavigationBar';

import SubjectsList from '../components/Subjects/SubjectsList'
import AddSubject from '../components/Subjects/AddSubject'
import SubjectDetails from '../components/Subjects/SubjectDetails'
import EditSubject from '../components/Subjects/EditSubject'


const Stack = createNativeStackNavigator();

const SubjectsScreen = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Subjects List"
                screenOptions={{
                    header: (props) => <CustomNavigationBar {...props} />,
                }}
                name='SubjectsStack'
            >
                <Stack.Screen name="Subject List" component={SubjectsList} />
                <Stack.Screen name="Add Subject" component={AddSubject} />
                <Stack.Screen name="Subject Details" component={SubjectDetails} />
                <Stack.Screen name="Subject Assignment" component={EditSubject} />
            </Stack.Navigator>
        </>
    )
}

export default SubjectsScreen