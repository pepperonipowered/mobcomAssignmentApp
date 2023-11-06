import { NavigationContainer } from "@react-navigation/native";

/**
 * This is where we define our navigations either stack or tab.
 * We wrap the whole app with the Navigation Container.
 * We shall implement the tab navigator for Assignments, Completed, Analytics and Settings.
 * We can use react native paper for styled components without creating custom styles outside from layouts for convinience.
 * ~Glenn
 */
export default function App() {
  return (
    // Wrap the navigation container with react native paper so that it applies styles and themes to the application
    <PaperProvider>
    {/* This is the wrapper code needed to navigate through pages */}
      <NavigationContainer>
        {/* We add our navigation here, either tab, stack, drawer, and etc. */}
        <Tab.Navigator>
          {/* Now add your screen names and what components those screens should render */}
          <Tab.Screen name="AssignmentsScreen" component={AssignmentsScreen} />
          <Tab.Screen name="CompletedScreen" component={CompletedScreen} />
          <Tab.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
          <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}