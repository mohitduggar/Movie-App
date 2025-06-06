import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from './src/MoviesScreen';
import TVScreen from './src/TVScreen';
import SearchScreen from './src/SearchScreen';
import MovieDetailsScreen from './src/MovieDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={MoviesScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="TV Shows" component={TVScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
