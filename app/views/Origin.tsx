import * as dateFns from 'date-fns'
import * as React from 'react'
import { IState, ScreenProps } from '../commonTypes'
import QuestionBase from '../components/QuestionBase'
import { IEntryData, insertEntry } from '../storage'
import { actions, Consumer, Dispatch } from '../store'

const options = [
  'people',
  'event',
  'music',
  'body',
]

const Origin = (props: ScreenProps) => {

  const onSelect = (dispatch: Dispatch, name: string) => {
    dispatch({ type: actions.SET_ORIGIN, payload: name }, (state: IState) => {
      const now = new Date()
      const keyString = dateFns.format(now, 'YYYY-MM-DD HH:mm:ss')
      if (state.selectedOrigin && state.selectedIntensity && state.selectedMood) {
        const newEntry: IEntryData = {
          [keyString]: {
            name: state.selectedMood,
            intensity: state.selectedIntensity,
            origin: state.selectedOrigin,
          },
        }
        insertEntry(newEntry, () => {
          props.navigation.navigate('Statistics')
        })
      } else {
        console.error('Something is wrong with state')
        props.navigation.navigate('Statistics')
      }
    })
  }

  return (
    <Consumer>
      {({ dispatch }) => {
        return (<QuestionBase
          onSelect={(name) => onSelect(dispatch, name)}
          navigation={props.navigation}
          questionOptions={options}
          questionName='origin'
        />)
      }}
    </Consumer>
  )
}

export default Origin
