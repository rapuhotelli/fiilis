import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationActions,
  NavigationScreenProp,
  StackActions
} from 'react-navigation'
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
    // Reset stack on Home press
    navigationOptions: {
      tabBarOnPress: (arg: {navigation: NavigationScreenProp<{}>}) => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'MoodQuestion' })],
        });
        arg.navigation.dispatch(resetAction)
      },
    },
  },
  Statistics: {
    screen: Statistics,
  },
})

export default TabNavigator
