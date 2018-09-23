import * as React from 'react'
import {createBottomTabNavigator, createStackNavigator, TabBarBottom } from 'react-navigation'
import { connectNavigationScreen } from './store'
import Intensity from './views/Intensity'
import Mood from './views/Mood'
import Statistics from './views/Statistics'

const QuestionStack = createStackNavigator({
  MoodQuestion: {
    screen: connectNavigationScreen(Mood),
  },
  IntensityQuestion: {
    screen: connectNavigationScreen(Intensity),
  },
}, {
  headerMode: 'none',
})

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: QuestionStack,
    navigationOptions: {
      tabBarOnPress: (arg) => {
        console.log('onPress', arg)
      }, 
    },
  },
  Statistics: {
    screen: Statistics,
  },
})

export default TabNavigator
