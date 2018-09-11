import {createStackNavigator, NavigationScreenProps} from 'react-navigation'
import Question from './views/Question'

export default createStackNavigator({
  Question: {
    screen: Question,
  },

  /*
  Statistic: {
    screen: RentalList,
    navigationOptions: ({ navigation }) => ({
      title: 'Rental list'
    })
  }
  */
}, {
  headerMode: 'none'
})
