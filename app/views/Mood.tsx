import * as React from 'react'
import QuestionBase from '../components/QuestionBase'
import {actions, Dispatch} from '../store'

const options = [
  'happy',
  'sad',
  'sehnsucht',
  'defeat',
  'enthused!',
]

interface Props {
  navigation: any,
  dispatch: Dispatch
}

// const Mood = (props: Props) => {
class Mood extends React.Component<Props> {

  private didFocusSub: any

  constructor(props: Props) {
    super(props)
    this.didFocusSub = this.props.navigation.addListener(
      'didFocus',
      () => {
        props.dispatch({ type: actions.RESET })
      },
    )
  }

  onSelect = (name: string) => {
    console.log('onSelect, should dispatch:', this.props.dispatch)
    this.props.dispatch({ type: actions.SET_MOOD, payload: name })
    this.props.navigation.navigate('IntensityQuestion')
  }

  componentWillUnmount() {
    this.didFocusSub.remove()
  }

  render() {
    return (
      <QuestionBase
          onSelect={(name) => this.onSelect(name)}
          navigation={this.props.navigation}
          questionOptions={options}
          questionName='mood'
      />
    )
  }
}

export default Mood
