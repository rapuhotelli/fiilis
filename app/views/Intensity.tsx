import * as React from 'react'
import { ScreenProps } from '../commonTypes'
import QuestionBase from '../components/QuestionBase'
import { actions, Consumer, Dispatch } from '../store'

const options = [
  'major',
  'medium',
  'minor',
]

const Intensity = (props: ScreenProps) => {

  const onSelect = (dispatch: Dispatch, name: string) => {
    dispatch({ type: actions.SET_INTENSITY, payload: name })
    props.navigation.navigate('Origin')
  }

  return (
    <Consumer>
      {({ dispatch }) => {
        return (<QuestionBase
          title='How strongly?'
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
