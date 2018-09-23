import * as React from 'react'
import { NavigationActions, NavigationEventSubscription, NavigationScreenProp, StackActions } from 'react-navigation'
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
  navigation: NavigationScreenProp<{}>,
  dispatch: Dispatch
}

class Mood extends React.Component<Props> {

  private didFocusSub: NavigationEventSubscription

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
