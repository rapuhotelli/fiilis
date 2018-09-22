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
        props.dispatch({ type: 'RESET' })
      },
    )
  }

  onSelect = (dispatch: Dispatch, name: string) => {
    dispatch({ type: 'SET_MOOD', payload: name })
    this.props.navigation.navigate('IntensityQuestion')
  }

  componentWillUnmount() {
    this.didFocusSub.remove()
  }

  render() {
    return (
      <Consumer>
        {({dispatch}) => {
          return (<QuestionBase
            onSelect={(name) => this.onSelect(dispatch, name)}
            navigation={this.props.navigation}
            questionOptions={options}
            questionName='mood'
          />)
        }}
      </Consumer>
    )
  }
}

export default Mood
