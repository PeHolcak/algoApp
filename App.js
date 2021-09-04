import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from "./screens/home";
import AlgoDetail from "./screens/algo-detail";
import AlgoRun from "./screens/algo-run";
import Settings from "./screens/settings";

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const headerStyle = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};

export default function App() {
  return (
    <PaperProvider>

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="AlgoDetail" component={AlgoDetail} options={{
            title: 'Algorith detail',
            ...headerStyle
          }} />
          <Stack.Screen name="AlgoRun" component={AlgoRun} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{
            title: 'Settings',
            ...headerStyle
          }} />
        </Stack.Navigator>
      </NavigationContainer>

    </PaperProvider>
  );
}


