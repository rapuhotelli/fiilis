import * as React from 'react'
import {LayoutChangeEvent, View} from 'react-native'
import {StyleSheet} from 'react-native'
import FeelButton from '../components/FeelButton'
import Screen from '../components/Screen'

interface Props {
  navigation: any,
  questionOptions: string[],
  questionName: string,
  onSelect: (ref: any) => void
}

interface State {
  boxSize: number,
  selectedMood: string | null,
}

export default class MoodQuestion extends React.Component<Props, State> {

  state = {
    boxSize: 0,
    selectedMood: null,
  }

  buttonSelection = (value: string) => {
    this.props.onSelect(value)
  }

  layout = (event: LayoutChangeEvent) => {
    const containerWidth = event.nativeEvent.layout.width
    this.setState({
      boxSize: containerWidth / 3,
    })
  }

  render() {
    const { questionOptions = [] } = this.props
    return (
      <Screen style={styles.container}>
        <View style={styles.grid} onLayout={this.layout}>
          {this.state.boxSize > 0 && questionOptions.map((opt) => (
              <FeelButton
                key={opt}
                boxSize={this.state.boxSize}
                name={opt}
                onPress={this.buttonSelection}
              />
          ))}
        </View>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // padding: margin,
  },
  container: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
