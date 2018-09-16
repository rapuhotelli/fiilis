import * as React from 'react'
import {Text, View} from 'react-native'
import {StyleSheet} from 'react-native'
import Screen from '../components/Screen'

interface Props {
  navigation: any
}

export default class Question extends React.Component<Props> {
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
