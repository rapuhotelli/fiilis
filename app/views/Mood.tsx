import * as React from 'react'
import { NavigationEventSubscription } from 'react-navigation'
import QuestionBase from '../components/QuestionBase'
import {actions} from '../store'

import { ScreenProps } from '../commonTypes'

const options = [
  'happy',
  'sad',
  'sehnsucht',
  'defeat',
  'enthused!',
  'test',
]

class Mood extends React.Component<ScreenProps> {

  private didFocusSub: NavigationEventSubscription

  constructor(props: ScreenProps) {
    super(props)
    this.didFocusSub = this.props.navigation.addListener(
      'didFocus',
      () => {
        props.dispatch({ type: actions.RESET })
      },
    )
  }

  onSelect = (name: string) => {
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
