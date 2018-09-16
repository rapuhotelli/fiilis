import * as React from 'react'
import { View, ViewStyle } from 'react-native'
// import { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'

interface Props {
  style?: ViewStyle
  children: React.ReactNode[]
}
export default class Screen extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  }

  render(): JSX.Element {
    const { style, children } = this.props
    return (
      <View style={style}>{children}</View>
    )
  }
}
