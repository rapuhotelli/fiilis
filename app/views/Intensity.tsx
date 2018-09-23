import * as React from 'react'
import QuestionBase from '../components/QuestionBase'
import {actions, Consumer, Dispatch} from '../store'

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
    dispatch({ type: actions.SET_INTENSITY, payload: name })
    // Reset navigation stack so that back button takes us to Question, not intensity

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
