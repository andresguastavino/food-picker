import 'react-native-gesture-handler';
import React, { useState, createContext, useContext } from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const AppContext = createContext({ foods: [], addFood: () => {} });

export default function App() {

  const [ foods, setFoods ] = useState([]);

  const addFood = (newFood) => {
    if (!foods) {
      foods = [];
    }
    foods.push(newFood);
    setFoods(JSON.parse(JSON.stringify(foods)));
  }

  return (
    <AppContext.Provider value={{ foods, addFood }}>
      <StackCmp></StackCmp>
    </AppContext.Provider>
  );
}

function StackCmp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Awesome Home' }} />
        <Stack.Screen name="NewFood" component={NewFoodForm} options={{ title: 'New Food' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({ navigation }) {

  const { foods } = useContext(AppContext);

  const onPress = () => {
    navigation.push('NewFood');
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>Add New Food To List</Text>
      </TouchableOpacity>
      { foods?.map((food, i) => (
        <Text key={i}>{food}</Text>
      )) }
    </View>
  );
}

function NewFoodForm({ navigation }) {

  const [ foodName, setFoodName ] = useState('');
  const [ error, setError ] = useState(false);

  const { addFood } = useContext(AppContext);

  const onPress = () => {
    if (!foodName) {
      setError(true);
      return;
    }
    setError(false);
    addFood(foodName);
    navigation.pop();
  }

  return (
    <View>
      <Text>New Food</Text>
      <TextInput
        onChangeText={setFoodName}
        value={foodName}
        placeholder="What's the food name?"
      />
      { error ? <Text>Write a food name to add it</Text> : <></> }
      <TouchableOpacity onPress={onPress}>
        <Text>Add (+)</Text>
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
