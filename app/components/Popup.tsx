import * as React from 'react'
import {Animated, Dimensions, StyleSheet, View, Easing, ViewStyle} from 'react-native'
import AnimatedValue = Animated.AnimatedValue

interface Props {
  origin: {left: number, top: number, width: number, height: number} | null
  children: React.ReactNode,
  style?: ViewStyle,
  onReady?: () => void
}
interface State {
  animatedValue: AnimatedValue
}
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export default class Popup extends React.Component<Props, State> {
  state = {
    animatedValue: new Animated.Value(0),
    renderInValue: new Animated.Value(0),
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
    ).start(this.renderIn)
  }

  renderIn = () => {
    const { onReady = () => {} } = this.props
    console.log('done entering popup')
    Animated.timing(
      this.state.renderInValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
      },
    ).start(onReady)
  }

  render() {
    const { origin, children, style: propStyle = null } = this.props
    if (origin === null) {
      return null
    }

    return (
      <Animated.View
        style={[styles.generics, propStyle && propStyle, {
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
        <Animated.View style={[styles.container, {opacity: this.state.renderInValue}]}>
          {children}
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  verticalCenter: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  container: {
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
