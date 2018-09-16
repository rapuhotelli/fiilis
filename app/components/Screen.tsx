import * as React from 'react'
import {Animated, Easing, StyleSheet, View, ViewStyle} from 'react-native'
import AnimatedValue = Animated.AnimatedValue

interface Props {
  children: React.ReactNode,
  style?: ViewStyle,
  onReady?: () => void
}
interface State {
  animatedValue: AnimatedValue
}
// const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export default class Screen extends React.Component<Props, State> {
  state = {
    animatedValue: new Animated.Value(0),
  }

  componentDidMount() {
    const { onReady = () => {} } = this.props
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
      },
    ).start(onReady)
  }

  render() {
    const { children, style: propStyle = null } = this.props

    return (
      <View style={[styles.container, propStyle && propStyle]}>
        {children}
      </View>
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
