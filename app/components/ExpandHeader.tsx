import * as React from 'react'
import { Animated, Dimensions, StyleSheet, Text, View, Easing } from 'react-native'
import AnimatedValue = Animated.AnimatedValue

interface Props {
  origin: {left: number, top: number, width: number, height: number} | null
}
interface State {
  animatedValue: AnimatedValue
}
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export default class ExpandHeader extends React.Component<Props, State> {
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
    const { origin } = this.props
    if (origin === null) {
      return null
    }
    console.log(this.state.animatedValue)
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

        <Text>Test</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  generics: {position: 'absolute', backgroundColor: 'rebeccapurple'},
})
