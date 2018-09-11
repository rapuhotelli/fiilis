import * as React from 'react'
import {LayoutChangeEvent, LayoutRectangle, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'

interface Props {
  name: string,
  image?: string,
  // onPress: (rect: LayoutRectangle, name: string) => void,
  onPress: (rect: any, name: string) => void,
  boxSize: number
}
export default class FeelButton extends React.Component<Props> {

  // buttonRef: Ref<View> | null = null
  buttonRef: any

  onPress = () => {
    this.buttonRef.measure((fx, fy, width, height, px, py) => {
      this.props.onPress({left: px, top: py, width, height}, this.props.name)
    })
  }

  render() {
    const { name, boxSize } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View ref={view => {this.buttonRef = view}} style={[styles.container, {width: boxSize, height: boxSize}]}>
          <View style={[styles.box]}>
            <Text style={styles.icon}>{name}</Text>
          </View>
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
    padding: 12,
  },
  box: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    borderWidth: 6,
    borderColor: 'rebeccapurple',
  },
})
