import * as React from 'react'
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

interface Props {
  name: string,
  image?: string,
  // onPress: (rect: LayoutRectangle, name: string) => void,
  onPress: (rect: any, name: string) => void,
  boxSize: number
}
const padding = 12

export default class FeelButton extends React.Component<Props> {

  // buttonRef: Ref<View> | null = null
  buttonRef: any
  state = {
    animatedValue: new Animated.Value(1),
  }

  componentDidMount() {
    this.setState({
      animatedValue: new Animated.Value(1),
    })
  }

  onPress = () => {
    setTimeout(() => {
      this.buttonRef.measure((fx, fy, width, height, px, py) => {
        this.props.onPress({left: px + padding, top: py + padding, width: width - padding * 2, height: width - padding * 2}, this.props.name)
      })
    }, 500)
    Animated.spring(this.state.animatedValue, {
      toValue: 0.5,
      bounciness: 50,
      speed: 30,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { name, boxSize } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View ref={view => {this.buttonRef = view}} style={[styles.container, {width: boxSize, height: boxSize}]}>
          <Animated.View style={[styles.box, {opacity: this.state.animatedValue}]}>
            <Text style={styles.icon}>{name}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  container: {
    padding,
  },
  box: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    borderWidth: 6,
    borderColor: 'rebeccapurple',
  },
})
