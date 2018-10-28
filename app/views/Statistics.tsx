import * as dateFns from 'date-fns'
import * as React from 'react'
import { BackHandler, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import { NavigationEventSubscription, NavigationScreenProp } from 'react-navigation'
import Month, { CalendarData, CalendarEntry } from '../components/Month'
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
  modalContent: CalendarData | null
}

const COLOR_PRIMARY = '#663399'
const { height: deviceHeight } = Dimensions.get('window')

const MonthButton = (props: {onPress: any, label: string, enabled: boolean}) => {
  return (
    <TouchableOpacity onPress={() => props.enabled && props.onPress()} style={{flex: 1, alignItems: 'center'}}>
      <LinearGradient
        colors={props.enabled ? [COLOR_PRIMARY, '#442266'] : ['#cccccc', '#c0c0c0']}
        style={{padding: 10, borderRadius: 5}}
      >
        <Text style={{color: 'white'}}>{props.label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default class Statistics extends React.Component<Props, State> {
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
      modalContent: null,
    }

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

  onDayPress = (entries: CalendarData) => {
    this.setState({
      modalContent: entries,
    })
  }

  closeModal = () => this.setState({ modalContent: null })

  render() {
    const previousMonth = dateFns.subMonths(this.state.selectedMonth, 1)
    const nextMonth = dateFns.addMonths(this.state.selectedMonth, 1)
    const dateKeys = Object.keys(this.state.entryData).sort()
    const hasFutureEntries = new Date(dateKeys[dateKeys.length -1]) > dateFns.endOfMonth(this.state.selectedMonth)
    const hasPastEntries = new Date(dateKeys[0]) < this.state.selectedMonth

    const modalDate = this.state.modalContent ? Object.keys(this.state.modalContent)[0] : null
    const modalContent = this.state.modalContent && modalDate ? this.state.modalContent[modalDate] : null
    const modalHeight = modalContent ? ((modalContent.length * 50) + 80) : 0
    console.log(modalHeight)
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
          <Month onDayPress={this.onDayPress} selectedMonth={this.state.selectedMonth} data={this.state.entryData} />
        </View>
        <Modal
          isVisible={this.state.modalContent !== null}
          useNativeDriver={true}
          animationIn='zoomInDown'
          animationOut='zoomOutUp'
          onBackdropPress={this.closeModal}
          onBackButtonPress={this.closeModal}
        >
          {modalContent !== null && modalDate !== null && (
            <View style={styles.modal}>
              <View style={[styles.headerRow]}>
                <Text style={{flex: 2, color: COLOR_PRIMARY}}>
                  {dateFns.format(new Date(modalDate), 'dddd, Do of MMMM, YYYY')}
                </Text>
                <TouchableOpacity onPress={this.closeModal} style={{flex: 1, alignSelf: 'flex-start', alignItems: 'flex-end'}}>
                  <LinearGradient
                    colors={[COLOR_PRIMARY, '#442266']}
                    style={{padding: 10, marginTop: 10, borderRadius: 5, right: 0, alignItems: 'flex-start'}}
                  >
                    <Text style={{color: 'white'}}>Close</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {modalContent && modalContent.map((entry: CalendarEntry) => (
                <View style={styles.modalRow} key={entry.time}>
                  <View style={{flex: 1}}><Text>{entry.time}</Text></View>
                  <View style={{flex: 1}}><Text>{entry.name}</Text></View>
                  <View style={{flex: 1}}><Text>{entry.origin}</Text></View>
                  <View style={{flex: 1}}><Text>{entry.intensity}</Text></View>
                </View>
              ))}
            </View>
          )}
        </Modal>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container:  {
    flex:  1,
    backgroundColor: '#F5FCFF',
  },
  headerRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalRow: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'flex-start',
    borderWidth: 4,
    borderColor: COLOR_PRIMARY,
    // height: deviceHeight/2,
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    marginTop: 20,
  },
  monthContainer:  {
    flex:  1,
    backgroundColor: '#F5FCFF',
  },
})
