import { NavigationScreenProp } from 'react-navigation'
import { Dispatch } from './store'

export interface ScreenProps {
  navigation: NavigationScreenProp<{}>,
  dispatch: Dispatch
}

export interface IState {
  selectedMood: string | null
  selectedIntensity: string | null
  selectedOrigin: string | null
  dispatch: Dispatch
}
