import * as React from 'react'
import {BackHandler, StyleSheet, Text, View} from 'react-native'

import { NavigationEventSubscription, NavigationScreenProp } from 'react-navigation'
import Screen from '../components/Screen'

interface Props {
  navigation: NavigationScreenProp<{}>
}

export default class Statistics extends React.Component<Props> {
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
    console.log('handle back')
    return true
  }

  componentWillUnmount() {
    console.log('should unmount')
    this.willBlurSub.remove()
    this.didFocusSub.remove()

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  render() {
    return (
      <Screen style={styles.container}>
        <View style={styles.grid}>
          <Text>Statistics</Text>
        </View>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // padding: margin,
  },
  container: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
