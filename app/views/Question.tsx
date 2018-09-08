import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import FeelButton from '../components/FeelButton'
import Screen from '../components/Screen'

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

const margin = 10

export default class Question extends React.Component {

  state = {
    boxSize: 10,
  }

  chooseMood = (name) => {
    console.log(name)
  }

  leiska = (event) => {
    const containerWidth = event.nativeEvent.layout.width
    this.setState({
      boxSize: containerWidth / 3,
    })
  }

  render() {
    return (
      <Screen style={styles.container}>
        <View style={styles.grid} onLayout={this.leiska}>
          {[...Array(9)].map((_, i) => <FeelButton boxSize={this.state.boxSize} name={`tussi${i}`} onPress={this.chooseMood}/>)}
        </View>
      </Screen>
    )
  }
}
/*
        <Text>Valitse fiilis</Text>
        <FeelButton name="woo" onPress={this.chooseMood}/>
*/
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
