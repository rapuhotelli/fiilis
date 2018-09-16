import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'

import Intensity from './views/Intensity'
import Mood from './views/Mood'
import Statistics from './views/Statistics'

const QuestionStack = createStackNavigator({
  MoodQuestion: {
    screen: Mood,
  },
  IntensityQuestion: {
    screen: Intensity,
  },
}, {
  headerMode: 'none',
})

export default createBottomTabNavigator({
  Home: {
    screen: QuestionStack,
  },
  Statistics: {
    screen: Statistics,
  },
})
