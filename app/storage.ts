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
  await initStorage()
  insertEntry({
    '2018-10-01 10:00:00': { name: 'sehnsucht', intensity: 'medium', origin: 'derp'},
    '2018-10-01 12:00:00': { name: 'happy', intensity: 'medium', origin: 'derp'},
    '2018-10-01 13:00:00': { name: 'happy', intensity: 'medium', origin: 'derp'},
    '2018-10-01 14:00:00': { name: 'happy', intensity: 'medium', origin: 'derp'},
    '2018-10-02 10:00:00': { name: 'happy', intensity: 'medium', origin: 'derp'},
    '2018-10-03 10:00:00': { name: 'graah', intensity: 'medium', origin: 'derp'},
    '2018-10-07 10:00:00': { name: 'sad', intensity: 'medium', origin: 'derp'},
    '2018-10-07 12:00:00': { name: 'happy', intensity: 'medium', origin: 'derp'},
    '2018-09-20 12:00:00': { name: 'happy', intensity: 'medium', origin: 'derp'},
  })

}

export const initStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(ENTRY_KEY)
    if (!value) {
      console.log('Initializing empty entryData store')
      return AsyncStorage.setItem(ENTRY_KEY, JSON.stringify({}))
    }
    console.log('entryData exists!')
  } catch (error) {
    console.error('Storage error on init')
  }
}

export const insertEntry = (newEntry: IEntryData, callback?: any) => {
  AsyncStorage.mergeItem(ENTRY_KEY, JSON.stringify(newEntry), () => {
    AsyncStorage.getItem(ENTRY_KEY, (err, result) => {
      if (result && callback) {
        callback(JSON.parse(result))
      }
    })
  })
}

export const getEntries = (callback: (entryData: IEntryData) => void) => {
  AsyncStorage.getItem(ENTRY_KEY, (err, result) => {
    if (result) {
      callback(JSON.parse(result))
    }
  })
}
