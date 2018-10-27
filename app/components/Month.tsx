import * as dateFns from 'date-fns'
import * as React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { IEntry, IEntryData } from '../views/Statistics'

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

interface IDayProps {
  dayNumber: number | null
  entryData: IEntry[] | null
}
const Day = ({entryData, dayNumber}: IDayProps) => {
  const gradient = entryData ? ['#663399', '#442266'] : ['#cccccc', '#c0c0c0']
  const textColor = entryData ? 'white' : 'black'
  const Wrapper = entryData ? TouchableOpacity : View
  return (
    <View style={[styles.day]}>
      {dayNumber !== null && (
      <Wrapper>
        <LinearGradient colors={gradient} style={styles.innerDay}>
          <Text style={{color: textColor, alignSelf: 'flex-start', paddingLeft: 5}}>{dayNumber}</Text>
          {entryData && (
            <View style={styles.entryCounter}>
              {entryData && <Text style={{color: textColor}}>{entryData.length}</Text>}
            </View>
          )}
        </LinearGradient>
      </Wrapper>
      )}
    </View>
  )
}

export interface CalendarEntry {
  time: string
  name: string
  intensity: string
  origin: string
}

export interface CalendarData {
  [key: string]: CalendarEntry[]
}

interface Props {
  data: IEntryData
  // currentYearMonth: string // 2018-01
  selectedMonth: Date,
}
interface State {
  selectedDate: Date
}

class Month extends React.Component<Props, State> {
  state = {
    selectedDate: new Date(),
  }

  renderMonth() {
    const days = []
    const isoWeekDay = dateFns.getISODay(this.props.selectedMonth)
    const daysInMonth = dateFns.getDaysInMonth(this.props.selectedMonth)
    for (let i = 1 - (isoWeekDay - 1); i <= daysInMonth; i++) {
      if (i <= 0) {
        days.push(<Day key={i} entryData={null} dayNumber={null} />)
        continue
      }
      const currentDay = dateFns.addDays(this.props.selectedMonth, i - 1)
      const result = dateFns.format(
        currentDay,
        'YYYY-MM-DD',
      )
      const entryData = this.props.data[result]
      days.push(<Day key={i} entryData={entryData} dayNumber={i} />)
    }
    return days
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMonth()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth,
    padding: 10,
  },
  day: {
    width: `${100 / 7}%`,
    height: deviceHeight / 8,
    shadowColor: '#F9A440',
    padding: 5,
  },
  innerDay: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: 5,
  },
  entryCounter: {
    alignSelf: 'flex-end', padding: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'white',
    borderTopLeftRadius: 5,
  },
  week: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 80,
  },
})

export default Month
