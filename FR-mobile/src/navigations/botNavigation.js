import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import LoginRegisScreen from '../screens/LoginRegisScreen';
import TabNavigation from './TabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectIsLogin } from '../store/slices/userSlice';

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="LoginREgis" component={LoginRegisScreen} options={{
//         headerShown: false,
//       }} />
//     </Stack.Navigator>
//   );
// }

const Navigation = () => {

  const isLogin = useSelector(selectIsLogin)


  // AsyncStorage.getItem('@storage_Key').then(data => {
  //   console.log(data)
  // })
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored

      }
    } catch (e) {
      console.log(e)
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [isLogin])

  return (
    <NavigationContainer>


      <Stack.Navigator>

        {!isLogin ?
          <>
            <Stack.Screen name="MainNavigation" component={TabNavigation} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="LoginREgis" component={LoginRegisScreen} options={{
              headerShown: false,

            }} />

          </>
          :
          <Stack.Screen name="MainNavigation" component={TabNavigation} />
        }

      </Stack.Navigator>

    </NavigationContainer>
  )
}
//! global stoarge basket [], 
// {
//   type:'add_item',
//   payload: {...item, qty:1}
// }
// {
//   type: 'inc_item',
//   payload: idx
// }
// {
//   type: 'dec_item',
//   payload: item
// }

// tambahkan key qty ke object item yagn akn di simpen ke basket, 
//! {...item, qty: 1}
//! kalo add qty: cari index porduct, terus items.qty ++ 

//! kalo min qty: cari index porduct, terus items.qty -- 



export default Navigation