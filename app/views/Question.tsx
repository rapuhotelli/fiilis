import * as React from 'react'
import {Animated, LayoutChangeEvent, Text, View} from 'react-native'
import {StyleSheet} from 'react-native'
import FeelButton from '../components/FeelButton'
import Screen from '../components/Screen'

// const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

// const margin = 10

const feels = [
  'happy',
  'sad',
  'sehnsucht',
  'defeat',
  'enthused',
]

export default class Question extends React.Component {

  state = {
    boxSize: 0,
    selectedCoords: {},
  }

  chooseMood = (rect: any, name: string) => {
    console.log(rect)
    this.setState({
      selectedCoords: rect,
    })
    /*
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 5000,
      },
    ).start()
    */
    // return name
  }

  layout = (event: LayoutChangeEvent) => {
    const containerWidth = event.nativeEvent.layout.width
    this.setState({
      boxSize: containerWidth / 3,
    })
  }

  render() {
    console.log(this.state.selectedCoords)
    return (
      <Screen style={styles.container}>
        <View
          style={
            {
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.5)',
              ...this.state.selectedCoords,
            }
          }
        />

        <View style={styles.grid} onLayout={this.layout}>
          {feels.map((feel) => <FeelButton key={feel} boxSize={this.state.boxSize} name={feel} onPress={this.chooseMood}/>)}
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
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
