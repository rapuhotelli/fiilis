import React from "react"
import { View, StyleSheet } from "react-native"
import { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  style?: ViewStyleProp
}
export default class Screen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }
  
  render() {
    const { style, children } = this.props
    return (
      <View style={style}>{children}</View>
    )
  }
}