import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Components/HomeScreen';
import HaiScreen from './src/Components/NextScreen';
import CreateScreen from './src/Components/CreateScreen';
import SplashScreen from './src/Components/SplashScreen';
import ArrowButtonPage from './src/Components/ArrowScreen';

export type RootStackParamList = {
  Splash: undefined;
  EmergiSync: undefined;
  Ambulance: undefined;
  Hospital: { selectedOption: string };
  Arrow: { selectedOption: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmergiSync" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Ambulance" component={HaiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Hospital" component={CreateScreen} />
        <Stack.Screen name="Arrow" component={ArrowButtonPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;