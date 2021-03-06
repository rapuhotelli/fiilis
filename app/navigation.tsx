import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationActions,
  NavigationScreenProp,
  StackActions,
} from 'react-navigation'
import { connectNavigationScreen } from './store'

import Intensity from './views/Intensity'
import Mood from './views/Mood'
import Origin from './views/Origin'
import Statistics from './views/Statistics'

const QuestionStack = createStackNavigator({
  MoodQuestion: {
    screen: connectNavigationScreen(Mood),
  },
  IntensityQuestion: {
    screen: connectNavigationScreen(Intensity),
  },
  Origin: {
    screen: connectNavigationScreen(Origin),
  },
}, {
  headerMode: 'none',
})

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: QuestionStack,
    // Reset stack on Home press
    navigationOptions: {
      tabBarOnPress: (arg: {navigation: NavigationScreenProp<{}>}) => goHomeAndReset(arg.navigation),
    },
  },
  Statistics: {
    screen: Statistics,
  },
})

export const goHomeAndReset = (navigation: NavigationScreenProp<{}>) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MoodQuestion' })],
  })
  navigation.dispatch(resetAction)
}

export default TabNavigator
