import * as dateFns from 'date-fns'
import * as React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import {getDaysInMonth} from 'date-fns'

const { width: deviceWidth } = Dimensions.get('window')

interface IWeek {
  days?: number[]
  children: React.ReactNode
}

const Week = (props: IWeek) => (
  <View style={styles.week}>
    {props.children}
  </View>
)
const Day = (props) => (
  <View style={styles.day}>
    {props.children}
  </View>
)

const getMonday = (d: any) => {
  d = new Date(d)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  return new Date(d.setDate(diff))
}

interface Props {
  data: any
  currentYearMonth: string // 2018-01
}
interface State {
  currentMonth: Date,
  selectedDate: Date
}

class Month extends React.Component<Props, State> {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  }

  renderFirstWeek() {
    const days = []
    const isoWeekDay = dateFns.getISODay(this.props.currentYearMonth)

    const date = new Date(this.props.currentYearMonth)
    for (let i = 0; i < dateFns.getDaysInMonth(date); i++) {
       
      days.push(<Day><Text>{i}</Text></Day>)
    }
    return days
  }

  render() {
    const monthStartDate = new Date(this.props.currentYearMonth)
    const monthStartWeekday = monthStartDate.getDay()
    /*
    let day = 0

    console.log('monthStart', props.currentYearMonth, monthStartWeekday)
    console.log(new Date(props.currentYearMonth))
    */
    /*
    Array(7).fill(null).map((_, i) => {
      return (monthStartWeekday >= i) ? <Day><Text>{++day}</Text></Day> : null
    })
    */

    return (
      <View style={styles.container}>
        <Week>
          {this.renderFirstWeek()}
        </Week>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth,
    backgroundColor: 'yellow',
    // flexGrow: 1,
    // height: '100%',
  },
  day: {
    /*
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    */
    width: '14%',
    shadowColor: '#F9A440',
    backgroundColor: 'gray',
    // boxShadow: '-1px -1px #F9A440, inset -1px -1px 0 0 #F9A440',
  },
  week: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 80,
  },
})

export default Month
