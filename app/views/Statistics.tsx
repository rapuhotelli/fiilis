import * as React from 'react'
import {BackHandler, LayoutChangeEvent, StyleSheet} from 'react-native'
import { NavigationEventSubscription, NavigationScreenProp } from 'react-navigation'
import Graph from '../components/Graph'
import Screen from '../components/Screen'
import { goHomeAndReset } from '../navigation'

interface Props {
  navigation: NavigationScreenProp<{}>
}

const testData = [
  {date: '2018-10-01', entries: [{time: '10:00:00', name: 'sad'}, {time: '12:00:00', name: 'happy'}]},
  {date: '2018-10-02', entries: [{time: '10:00:00', name: 'happy'}]},
  {date: '2018-10-03', entries: [{time: '10:00:00', name: 'graah'}]},
  {date: '2018-10-04', entries: [{time: '10:00:00', name: 'sad'}, {time: '12:00:00', name: 'happy'}]},
  {date: '2018-10-05', entries: [{time: '10:00:00', name: 'happy'}]},
  {date: '2018-10-06', entries: [{time: '10:00:00', name: 'graah'}]},
  {date: '2018-10-07', entries: [{time: '10:00:00', name: 'sad'}, {time: '12:00:00', name: 'happy'}]},
  {date: '2018-10-08', entries: [{time: '10:00:00', name: 'happy'}]},
  {date: '2018-10-09', entries: [{time: '10:00:00', name: 'graah'}]},
]

interface State {
  graphSize: {
    height: number,
  }
}
export default class Statistics extends React.Component<Props, State> {

  state = {
    graphSize: {
      height: 0,
    },
  }

  private willBlurSub: NavigationEventSubscription
  private didFocusSub: NavigationEventSubscription
  constructor(props: Props) {
    super(props)
    this.willBlurSub = this.props.navigation.addListener(
      'willBlur',
      () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
      },
    )
    this.didFocusSub = this.props.navigation.addListener(
      'didFocus',
      () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      },
    )
  }

  handleBackPress = () => {
    goHomeAndReset(this.props.navigation)
    return true
  }

  componentWillUnmount() {
    console.log('should unmount')
    this.willBlurSub.remove()
    this.didFocusSub.remove()

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  onLayout = (e: LayoutChangeEvent) => {
    console.log(e.nativeEvent.layout)
    this.setState({
      graphSize: {
        height: e.nativeEvent.layout.height,
      },
    })
  }

  render() {
    return (
      <Screen style={styles.container} onLayout={this.onLayout}>
        <Graph data={testData} size={this.state.graphSize} />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
