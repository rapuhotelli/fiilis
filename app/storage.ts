import { AsyncStorage } from 'react-native'

export interface IEntry {
  name: string
  intensity: string
  origin: string
}

export interface IEntryData {
  [key: string]: IEntry
}

const ENTRY_KEY = '@fiilis:entryData'

export const clearStorage = async () => {
  await AsyncStorage.removeItem(ENTRY_KEY)
}

export const insertEntry = (newEntry: IEntryData, callback?: any) => {
  AsyncStorage.mergeItem(ENTRY_KEY, JSON.stringify(newEntry), () => {
    AsyncStorage.getItem(ENTRY_KEY, (err, result) => {
      if (result) {
        callback(JSON.parse(result))
      }
    })
  })
}

export const getEntries = (callback: any) => {
  AsyncStorage.getItem(ENTRY_KEY, (err, result) => {
    callback(result)
  })
}
