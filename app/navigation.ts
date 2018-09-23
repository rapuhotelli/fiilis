import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'

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
  },
  Statistics: {
    screen: Statistics,
  },
})

export default TabNavigator
