import * as dateFns from 'date-fns'
import * as React from 'react'
import {BackHandler, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationEventSubscription, NavigationScreenProp } from 'react-navigation'
import Month from '../components/Month'
import Screen from '../components/Screen'
import { goHomeAndReset } from '../navigation'

interface Props {
  navigation: NavigationScreenProp<{}>
}

export interface IEntry {
  time: string,
  name: string,
  intensity: string,
  origin: string
}

export interface IEntryData {
  [key: string]: IEntry[]
}

const testData: IEntryData = {
  '2018-10-01': [
    {time: '10:00:00', name: 'sehnsucht', intensity: 'medium', origin: 'derp'},
    {time: '12:00:00', name: 'happy', intensity: 'medium', origin: 'derp'},
    {time: '13:00:00', name: 'happy', intensity: 'medium', origin: 'derp'},
    {time: '14:00:00', name: 'happy', intensity: 'medium', origin: 'derp'},
  ],
  '2018-10-02': [{time: '10:00:00', name: 'happy', intensity: 'medium', origin: 'derp'}],
  '2018-10-03': [{time: '10:00:00', name: 'graah', intensity: 'medium', origin: 'derp'}],
  '2018-10-07': [
    {time: '10:00:00', name: 'sad', intensity: 'medium', origin: 'derp'},
    {time: '12:00:00', name: 'happy', intensity: 'medium', origin: 'derp'},
  ],
  '2018-10-10': [{time: '10:00:00', name: 'happy', intensity: 'medium', origin: 'derp'}],
  '2018-10-15': [{time: '10:00:00', name: 'graah', intensity: 'medium', origin: 'derp'}],
  '2018-10-20': [
    {time: '10:00:00', name: 'sad', intensity: 'medium', origin: 'derp'},
    {time: '12:00:00', name: 'happy', intensity: 'medium', origin: 'derp'},
  ],
  '2018-10-21': [{time: '10:00:00', name: 'happy', intensity: 'medium', origin: 'derp'}],
  '2018-10-22': [{time: '10:00:00', name: 'graah', intensity: 'medium', origin: 'derp'}],
  '2018-10-31': [{time: '10:00:00', name: 'graah', intensity: 'medium', origin: 'derp'}],
}

interface State {
  graphSize: {
    height: number,
  },
  selectedMonth: Date
}

const MonthButton = (props: {onPress: any, label: string}) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{flex: 1, alignItems: 'center'}}>
      <LinearGradient colors={['#663399', '#442266']} style={{padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white'}}>{props.label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default class Statistics extends React.Component<Props, State> {
  state = {
    graphSize: {
      height: 0,
    },
    selectedMonth: dateFns.startOfMonth(new Date()),
  }

  private todayDate: Date
  private willBlurSub: NavigationEventSubscription
  private didFocusSub: NavigationEventSubscription

  constructor(props: Props) {
    super(props)
    this.todayDate = new Date()
    this.willBlurSub = this.props.navigation.addListener(
      'willBlur',
      () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
      },
    )
    this.didFocusSub = this.props.navigation.addListener(
      'didFocus',
      () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      },
    )
  }

  handleBackPress = () => {
    goHomeAndReset(this.props.navigation)
    return true
  }

  componentWillUnmount() {
    this.willBlurSub.remove()
    this.didFocusSub.remove()
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  selectPreviousMonth = () => {
    this.setState({
      selectedMonth: dateFns.subMonths(this.state.selectedMonth, 1),
    })
  }

  selectNextMonth = () => {
    this.setState({
      selectedMonth: dateFns.addMonths(this.state.selectedMonth, 1),
    })
  }

  onLayout = (e: LayoutChangeEvent) => {
    this.setState({
      graphSize: {
        height: e.nativeEvent.layout.height,
      },
    })
  }

  render() {
    const previousMonth = dateFns.subMonths(this.state.selectedMonth, 1)
    const nextMonth = dateFns.addMonths(this.state.selectedMonth, 1)

    return (
      <Screen style={styles.container} onLayout={this.onLayout}>
        <View style={styles.selectorContainer}>
          <MonthButton
            onPress={this.selectPreviousMonth}
            label={dateFns.format(previousMonth, 'MMM')}
          />
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>{dateFns.format(this.state.selectedMonth, 'MMMM YYYY')}</Text>
          </View>
          <MonthButton
            onPress={this.selectNextMonth}
            label={dateFns.format(nextMonth, 'MMM')}
          />
        </View>
        <View style={styles.monthContainer}>
          <Month selectedMonth={this.state.selectedMonth} data={testData} />
        </View>
      </Screen>
    )
  }
}

        // <Graph data={testData} size={this.state.graphSize} />
const styles = StyleSheet.create({
  container:  {
    // padding: 12,
    flex:  1,
    backgroundColor: '#F5FCFF',
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    marginTop: 20,
  },
  monthContainer:  {
    // padding: 12,
    flex:  1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
