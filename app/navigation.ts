import {createStackNavigator} from 'react-navigation'
import Question from './views/Question'

export default createStackNavigator({
  Question: {
    screen: Question,
    navigationOptions: ({ navigation }) => ({
      title: 'Miltä nyt tuntuu?',
    }),
  },

  /*
  Statistic: {
    screen: RentalList,
    navigationOptions: ({ navigation }) => ({
      title: 'Rental list'
    })
  }
  */
})
