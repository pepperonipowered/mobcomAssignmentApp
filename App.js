import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PaperProvider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AssignmentsScreen from "./src/screens/AssignmentsScreen";
import CompletedScreen from "./src/screens/CompletedScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";


/**
 * This is where we define our navigations either stack or tab.
 * We wrap the whole app with the Navigation Container.
 * We shall implement the tab navigator for Assignments, Completed, Analytics and Settings.
 * We can use react native paper for styled components without creating custom styles outside from layouts for convinience.
 * ~Glenn
*/
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    // Wrap the navigation container with react native paper so that it applies styles and themes to the application
    <PaperProvider>
    {/* This is the wrapper code needed to navigate through pages */}
      <NavigationContainer>
        {/* We add our navigation here, either tab, stack, drawer, and etc. */}
        <Tab.Navigator 
          initialRouteName="AssignmentsScreen"
        >
          {/* Now add your screen names and what components those screens should render */}
          <Tab.Screen 
            name="AssignmentsScreen" 
            component={AssignmentsScreen} 
            options={{
              tabBarLabel: 'Assignments',
              tabBarIcon: () => {
                return <Icon name="format-list-bulleted" size={24} color='black' />;
              },
            }}
          />
          <Tab.Screen 
            name="CompletedScreen" 
            component={CompletedScreen} 
            options={{
              tabBarLabel: 'Completed',
              tabBarIcon: () => {
                return <Icon name="playlist-check" size={24} color='black' />;
              },
            }}
          />
          <Tab.Screen 
            name="AnalyticsScreen" 
            component={AnalyticsScreen} 
            options={{
              tabBarLabel: 'Analytics',
              tabBarIcon: () => {
                return <Icon name="google-analytics" size={24} color='black' />;
              },
            }}
          />
          <Tab.Screen 
            name="SettingsScreen" 
            component={SettingsScreen} 
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: () => {
                return <Icon name="cog" size={24} color='black' />;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}