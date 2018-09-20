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
  navigation: any
}
const Intensity = (props: Props) => {
  const onSelect = (dispatch: Dispatch, name: string) => {
    dispatch({ type: 'SET_INTENSITY', payload: name })
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MoodQuestion' })],
    })
    props.navigation.dispatch(resetAction)
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
