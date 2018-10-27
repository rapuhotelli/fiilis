import * as dateFns from 'date-fns'
import * as React from 'react'
import { BackHandler, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationEventSubscription, NavigationScreenProp } from 'react-navigation'
import Month, { CalendarData } from '../components/Month'
import Screen from '../components/Screen'
import { goHomeAndReset } from '../navigation'
import { getEntries, IEntryData } from '../storage'

interface Props {
  navigation: NavigationScreenProp<{}>
}

interface State {
  graphSize: {
    height: number,
  },
  selectedMonth: Date
  entryData: CalendarData
}

const MonthButton = (props: {onPress: any, label: string, enabled: boolean}) => {
  return (
    <TouchableOpacity onPress={() => props.enabled && props.onPress()} style={{flex: 1, alignItems: 'center'}}>
      <LinearGradient colors={props.enabled ? ['#663399', '#442266'] : ['#cccccc', '#c0c0c0']} style={{padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white'}}>{props.label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default class Statistics extends React.Component<Props, State> {
  private todayDate: Date
  private willBlurSub: NavigationEventSubscription
  private didFocusSub: NavigationEventSubscription

  constructor(props: Props) {
    super(props)

    this.state = {
      graphSize: {
        height: 0,
      },
      selectedMonth: dateFns.startOfMonth(new Date()),
      entryData: {},
    }

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
        getEntries(entries => {
          this.setState({
            entryData: this.parseEntryData(entries),
          })
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      },
    )
  }

  parseEntryData(entryData: IEntryData): CalendarData {
    const parsed: CalendarData = {}
    Object.keys(entryData).sort().map(timestamp => {
      const [date, time] = timestamp.split(' ')
      const entry = {
        time,
        ...entryData[timestamp],
      }
      parsed[date] ? parsed[date].push(entry) : parsed[date] = [entry]
    })
    return parsed
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
    const dateKeys = Object.keys(this.state.entryData).sort()
    const hasFutureEntries = new Date(dateKeys[dateKeys.length -1]) > dateFns.endOfMonth(this.state.selectedMonth)
    const hasPastEntries = new Date(dateKeys[0]) < this.state.selectedMonth
    return (
      <Screen style={styles.container} onLayout={this.onLayout}>
        <View style={styles.selectorContainer}>
          <MonthButton
            onPress={this.selectPreviousMonth}
            label={dateFns.format(previousMonth, 'MMM')}
            enabled={hasPastEntries}
          />
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>{dateFns.format(this.state.selectedMonth, 'MMMM YYYY')}</Text>
          </View>
          <MonthButton
            onPress={this.selectNextMonth}
            label={dateFns.format(nextMonth, 'MMM')}
            enabled={hasFutureEntries}
          />
        </View>
        <View style={styles.monthContainer}>
          <Month selectedMonth={this.state.selectedMonth} data={this.state.entryData} />
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
