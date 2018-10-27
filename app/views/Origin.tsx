import * as React from 'react'
import { AsyncStorage } from 'react-native'
import { ScreenProps } from '../commonTypes'
import QuestionBase from '../components/QuestionBase'
import {actions, Consumer, Dispatch} from '../store'

const options = [
  'people',
  'event',
  'music',
  'body',
]

const Origin = (props: ScreenProps) => {

  const onSelect = (dispatch: Dispatch, name: string) => {
    dispatch({ type: actions.SET_ORIGIN, payload: name }, () => {
      props.navigation.navigate('Statistics')
    })
  }

  return (
    <Consumer>
      {({ dispatch }) => {
        return (<QuestionBase
          onSelect={(name) => onSelect(dispatch, name)}
          navigation={props.navigation}
          questionOptions={options}
          questionName='origin'
        />)
      }}
    </Consumer>
  )
}

export default Origin
