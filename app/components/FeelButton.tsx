import * as React from 'react'
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { ViewStyle } from 'react-native'

interface Props {
  name: string,
  image?: string,
  onPress: (ref: any) => void,
  boxSize: number,
  style?: ViewStyle,
  clickable?: boolean
}
const padding = 12

export default class FeelButton extends React.Component<Props> {

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
    const { clickable, name } = this.props
    if (clickable) {
      this.props.onPress(name)
      Animated.spring(this.state.animatedValue, {
        toValue: 0.5,
        bounciness: 50,
        speed: 30,
        useNativeDriver: true,
      }).start(() => this.state.animatedValue.setValue(1))
    }
  }

  render() {
    const { name, boxSize, style: propStyle = null } = this.props
    return (
            <TouchableWithoutFeedback onPress={this.onPress}>
              <View ref={view => {this.buttonRef = view}} style={[styles.container, {width: boxSize, height: boxSize}]}>
                <Animated.View style={[styles.box, propStyle && propStyle, {opacity: this.state.animatedValue}]}>
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
    alignSelf: 'center',
    justifyContent: 'center',
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
