import React from "react"
import { Text, View, TouchableWithoutFeedback, StyleSheet } from "react-native"


type Props = {
  name: string,
  // image: string,
  onPress: () => string
}
export default class FeelButton extends React.Component<Props> {
  
  onPress = () => {
    this.props.onPress(this.props.name)
  }
  
  render() {
    const { image, boxSize } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.box, { width: boxSize, height: boxSize }]} >
        <Text>:(</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rebeccapurple',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
  }
})
