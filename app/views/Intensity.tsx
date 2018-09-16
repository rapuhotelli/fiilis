import * as React from 'react'
import { NavigationActions, StackActions } from 'react-navigation'
import QuestionBase from '../components/QuestionBase'

const options = [
  'major',
  'medium',
  'minor',
]

interface Props {
  navigation: any
}
const Intensity = (props: Props) => {
  const onSelect = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MoodQuestion' })],
    })
    props.navigation.dispatch(resetAction)
    props.navigation.navigate('Statistics')
  }
  return <QuestionBase onSelect={onSelect} navigation={props.navigation} questionOptions={options} questionName='intensity' />
}

export default Intensity
