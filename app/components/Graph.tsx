import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

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

  return (
    <View
      style={[
        styles.pillar,
        {
          backgroundColor: index % 2 ? 'rgba(240, 240, 240, 1)' : 'rgba(255, 255, 255, 1)',
        },
      ]}
    >
      {entries.map(entry => {
        return (
          <View style={styles.pillarEntry} key={entry.time}>
            <View style={styles.pillarGraphic}>
              <Text
                style={{
                  transform: [
                    { rotate: '-60deg' },
                    { translateY: -20 },
                    { translateX: 20 },
                  ],
                }}
              >
                {entry.name}
              </Text>
            </View>
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
