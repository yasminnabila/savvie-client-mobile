import { Text, View } from "react-native"
import * as Animatable from 'react-native-animatable';

import LottieView from 'lottie-react-native';



const TrackScreen = () => {

  return (
    <View className='flex-1 justify-center items-center '>
      {/* 
      <Animatable.Text animation="slideInDown" direction="alternate" iterationCount='infinite'>Up and down you go</Animatable.Text>
      <Animatable.Text
        animation="pulse" easing="ease-in-back" iterationCount="infinite" className='text-2xl'>❤️
      </Animatable.Text> 
      */}
      {/* <LottieView source={require('../lottie/loading.json')} autoPlay loop /> */}

      <LottieView source={require('../lottie/cart.json')} className='w-[200] bg-red-200 h-[100] absolute inset-x-0 bottom-0 ' />

    </View>
  )
}

export default TrackScreen