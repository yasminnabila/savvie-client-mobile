import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';
import { MaterialIcons } from "@expo/vector-icons";

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../asyncStorage';
import LoadingScreen from './LoadingScreen';

const HistoryScreen = () => {

  const navigation = useNavigation()

  // const dispatch = useDispatch()
  const modalizeRef = useRef(null);
  const { ref, open, close } = useModalize();

  const [test, setTest] = useState([])

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const basketCheck = () => {
    test.length == 0 && open()
  }


  const [history, setHistory] = useState(null)

  useEffect(() => {
    async function getHistory() {
      try {
        const { access_token } = await getData()
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            access_token: access_token
          },
        };

        let response = await fetch('https://savvie2.herokuapp.com/checkout', requestOptions)
        response = await response.json()
        setHistory(response)

      } catch (error) {
        console.log(error)
      }
    }

    getHistory()
  }, [])

  console.log(history)



  if (!history) return <LoadingScreen />

  return (
    <View className='flex-1'>

      {/* <View className="bg-white h-[50] w-[230] absolute top-[70] inset-x-0 flex flex-row mx-20 p-2 items-center shadow-lg rounded-3xl">
        <View className="border-r h-[30] justify-center mr-1 pr-2 absolute top-2 left-2">
          <MaterialIcons name="delivery-dining" size={24} color="black" />
        </View>
        <View className="ml-2 absolute inset-x-0 top-2 left-[45]">
          <Text className="font-medium text-black absolute top-0">
            Delivering to your door
          </Text>
          <Text className="text-gray-700 text-xs top-4">arrived in 20 mins</Text>
        </View>
      </View> */}

      <View className='h-[150] bg-[#77aa9c] items-center justify-end'>
        <Text className='text-4xl'>
          History
        </Text>
      </View>

      <ScrollView>
        {
          history.map((el, i) => {
            return (
              <View className='bg-red-300 h-[120] flex-row my-1'>
                <View className='h-[120] w-[130] bg-yellow-300'>

                </View>
                <View className='bg-blue-400 flex-1'>
                  <Text>
                    {el.name}
                  </Text>
                  <Text>
                    {i}
                  </Text>
                  <Text>
                    {el.OrderItems[0].Food.name}
                  </Text>
                  <Text>
                    {el.OrderItems[0].Food.Restaurant.name}
                  </Text>
                  <Text>
                    Nama MAKANAN
                  </Text>

                </View>
              </View>
            )
          })
        }
      </ScrollView>









      {/* MODAL REGISTER */}
      <Modalize
        modalHeight={490}
        ref={ref}
      >
        {/* ICON / PNG */}
        <View className='bg-red-300 h-[220] w-[340] rounded-3xl mt-10 self-center'>

        </View>
        {/* ICON / PNG */}
        <View className='self-center mt-2'>
          <Text className='text-2xl text-center font-bold tracking-normal w-[300]'>
            Want to order from this resto instead?
          </Text>
        </View>
        <View className='self-center mt-2'>
          <Text className='text-base text-center font-normal tracking-normal mx-6'>
            Sure thing, but we'll need to clear the items in your current cart from the previous resto first.
          </Text>
        </View>
        <View className='flex-row space-x-5 items-center justify-center mt-5'>
          <TouchableOpacity className='border-2 border-green-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-yellow-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Yes, go ahead
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
      {/* MODAL REGISTER */}

    </View>
  )
}

export default HistoryScreen