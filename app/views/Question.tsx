import * as React from 'react'
import {Animated, LayoutChangeEvent, Text, View} from 'react-native'
import {StyleSheet} from 'react-native'
import FeelButton from '../components/FeelButton'
import Screen from '../components/Screen'
import Popup from './Popup'

// const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

// const margin = 10

const feels = [
  'happy',
  'sad',
  'sehnsucht',
  'defeat',
  'enthused',
]

const Page = {
  QUESTION: 0,
  INTENSITY: 1,
  DONE: 2,
}

export default class Question extends React.Component {

  state = {
    boxSize: 0,
    selectedCoords: null,
    selectedMood: null,
    selectedIntensity: null,
    page: Page.QUESTION,
  }

  chooseMood = (childRef: any) => {
    console.log(childRef)
    childRef.buttonRef.measure((fx, fy, width, height, px, py) => {
      const rect = {left: px + 12, top: py + 12, width: width - 24, height: width - 24}
      this.setState({
        page: Page.INTENSITY,
        selectedCoords: rect,
        selectedMood: childRef.props.name,
      })
    })
  }

  chooseIntensity = (childRef: any) => {
    this.setState({
      selectedIntensity: childRef.props.name,
    })
  }

  layout = (event: LayoutChangeEvent) => {
    const containerWidth = event.nativeEvent.layout.width
    this.setState({
      boxSize: containerWidth / 3,
    })
  }

  render() {
    return (
      <Screen style={styles.container}>

        <View style={styles.grid} onLayout={this.layout}>
          {feels.map((feel) => <FeelButton key={feel} boxSize={this.state.boxSize} name={feel} onPress={this.chooseMood}/>)}
        </View>
        {this.state.page === Page.INTENSITY && (
          <Popup boxSize={this.state.boxSize} onPress={this.chooseIntensity} origin={this.state.selectedCoords} />
        )}
        {this.state.page === Page.DONE && (
          <Popup boxSize={this.state.boxSize} onPress={this.chooseIntensity} origin={this.state.selectedCoords} />
        )}
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
