import * as React from 'react'
import QuestionBase from '../components/QuestionBase'
import {Consumer, Dispatch} from '../store'

const options = [
  'happy',
  'sad',
  'sehnsucht',
  'defeat',
  'enthused!',
]

interface Props {
  navigation: any
}

const Mood = (props: Props) => {
  const onSelect = (dispatch: Dispatch, name: string) => {
    dispatch({ type: 'SET_MOOD', payload: name })
    props.navigation.navigate('IntensityQuestion')
  }

  return (
    <Consumer>
      {({ dispatch }) => {
        return (<QuestionBase
          onSelect={(name) => onSelect(dispatch, name)}
          navigation={props.navigation}
          questionOptions={options}
          questionName='mood'
        />)
      }}
    </Consumer>
  )
}

export default Mood
