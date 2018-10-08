import * as React from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

  componentDidMount() {
    this.setState({
      animatedValue: new Animated.Value(0),
    })
  }

  onPress = () => {
    console.log('feelbutton onpress')
    const { onPress, name } = this.props
    onPress(name)
  }

  render() {
    const { name, boxSize, style: propStyle = null } = this.props
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View ref={view => {this.buttonRef = view}} style={[styles.container, {width: boxSize, height: boxSize}]}>
          <View style={[styles.box, propStyle && propStyle]}>
            <Text style={styles.icon}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
