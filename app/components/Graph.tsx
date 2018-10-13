import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface IDayData {
  date: string
  entries: IEntry[]
}
interface IEntry {
  time: string
  name: string
}

interface IPillar {
  dayData: IDayData
  index: number
}

const Pillar = (props: IPillar) => {
  const { dayData, index } = props
  const { entries, date } = dayData
  const parsedDate = date.split('-')

  const rowColor = index % 2 ? 'rgba(240, 240, 240, 1)' : 'rgba(255, 255, 255, 1)'

  return (
    <View
      style={[
        styles.pillar,
        {
          backgroundColor: rowColor,
        },
      ]}
    >
      {entries.map(entry => {
        return (
          <View style={styles.pillarEntry} key={entry.time}>
            <LinearGradient colors={[ 'rebeccapurple', rowColor]} style={styles.pillarGraphic}>
              <Text
                style={{
                  transform: [
                    { translateY: -30 },
                    { translateX: 0 },
                    { rotate: '-60deg' },
                  ],
                }}
              >
                {entry.name}
              </Text>
              <Text
                style={{
                  transform: [
                    { translateY: -30 },
                    { translateX: 10 },
                    { rotate: '-60deg' },
                  ],
                }}
              >
                {entry.time}
              </Text>
            </LinearGradient>
          </View>
        )
      })}
      <View style={styles.dateContainer}>
      <Text>{`${parsedDate[2]}.${parsedDate[1]}.`}</Text>
      </View>
    </View>
  )
}

interface GraphProps {
  data?: IDayData[]
  size: { height: number }
}
const Graph = (props: GraphProps) => {
  const { size, data = [] } = props
  return (
    <FlatList
      horizontal
      contentContainerStyle={[styles.graphContainer, { height: size.height }]}
      data={data}
      // pagingEnabled
      showsHorizontalScrollIndicator
      renderItem={({item, index}) => <Pillar index={index} dayData={item} />}
      keyExtractor={(item) => item.date}
    >
    </FlatList>
  )
}

const styles = StyleSheet.create({
  graphContainer: {
    backgroundColor: 'gray',
  },
  pillar: {
    flex: 1,
    justifyContent: 'flex-end',
    minWidth: 80,
  },
  pillarEntry: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    maxHeight: '30%',
    padding: 5,
  },
  pillarGraphic: {
    borderRadius: 5,
    // backgroundColor: 'red',
    height: '100%',
    justifyContent: 'flex-end',
  },
  dateContainer: {
    padding: 5,
  },
})

export default Graph
