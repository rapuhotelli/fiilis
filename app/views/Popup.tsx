import * as React from 'react'
import { Animated, Dimensions, StyleSheet, Text, View, Easing } from 'react-native'
import AnimatedValue = Animated.AnimatedValue
import FeelButton from '../components/FeelButton'

interface Props {
  origin: {left: number, top: number, width: number, height: number} | null
  onPress: (name: string) => void,
  boxSize: number,
}
interface State {
  animatedValue: AnimatedValue
}
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export default class Popup extends React.Component<Props, State> {
  state = {
    animatedValue: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.circle),
        // useNativeDriver: true,
      },
    ).start()
  }

  render() {
    const { origin, boxSize } = this.props
    if (origin === null) {
      return null
    }

    return (
      <Animated.View
        style={[styles.generics, {
          left: this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.left, 0],
          }),
          top: this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.top, 0],
          }),
          width: this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.width, deviceWidth],
          }),
          height: this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.height, deviceHeight],
          }),
          borderRadius: this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          }),
        }]}
      >
      <View style={styles.buttonContainer}>
        <View style={styles.verticalCenter}>
        <FeelButton style={{borderColor: 'white'}} name="herp" onPress={() => {}} boxSize={boxSize}/>
        <FeelButton style={{borderColor: 'white'}} name="herp" onPress={() => {}} boxSize={boxSize}/>
        <FeelButton style={{borderColor: 'white'}} name="herp" onPress={() => {}} boxSize={boxSize}/>
        </View>
      </View>
      </Animated.View>
    )
  }
}
          //<Text style={styles.niceText}>Test</Text>

const styles = StyleSheet.create({
  verticalCenter: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  box: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    borderWidth: 6,
    borderColor: 'rebeccapurple',
  },
  niceText: {
    color: 'white',
    fontSize: 24,
  },
  generics: {
    position: 'absolute',
    backgroundColor: 'rebeccapurple',
  },
})
