import {AsyncStorage} from 'react-native'

const clear = async () => {
  await AsyncStorage.removeItem('@fiilis:entryData')
}



const insertEntry = (newEntry) => {

  AsyncStorage.mergeItem('@fiilis:entryData', JSON.stringify(UID123_delta), () => {
    AsyncStorage.getItem('@fiilis:entryData', (err, result) => {
      console.log(result)
    })
  })

}
