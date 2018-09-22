import * as React from 'react'
import { NavigationActions, StackActions } from 'react-navigation'
import QuestionBase from '../components/QuestionBase'
import {Consumer, Dispatch} from '../store'

const options = [
  'major',
  'medium',
  'minor',
]

interface Props {
  navigation: any,
  dispatch: Dispatch,
}
const Intensity = (props: Props) => {

  const onSelect = (dispatch: Dispatch, name: string) => {
    dispatch({ type: 'SET_INTENSITY', payload: name })
    // Reset navigation stack so that back button takes us to Question, not intensity
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MoodQuestion' })],
    })
    props.navigation.dispatch(resetAction)
    dispatch({ type: 'RESET' })
    props.navigation.navigate('Statistics')
  }

  return (
    <Consumer>
      {({ dispatch }) => {
        return (<QuestionBase
          onSelect={(name) => onSelect(dispatch, name)}
          navigation={props.navigation}
          questionOptions={options}
          questionName='intensity'
        />)
      }}
    </Consumer>
  )
}

export default Intensity
