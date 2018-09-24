import * as React from 'react'
import devtools from './devtools'

export type Dispatch = (action: IAction) => void

export interface IState {
  selectedMood: string | null
  selectedIntensity: string | null
  dispatch: Dispatch
}

const initialState: IState = {
  selectedMood: null,
  selectedIntensity: null,
  dispatch: () => {console.warn('dispatch undefined')},
}

const Context = React.createContext(initialState)

export interface IAction {
  type: string,
  payload?: any
}

type Reducer = (state: any, action: IAction) => IState

export const actions = {
  RESET: 'fiilis/reset',
  SET_MOOD: 'fiilis/setMood',
  SET_INTENSITY: 'fiilis/setIntensity',
}

const reducer: Reducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case actions.RESET:
      return initialState
    case actions.SET_MOOD:
      return {
        ...state,
        selectedMood: payload,
      }
    case actions.SET_INTENSITY:
      return {
        ...state,
        selectedIntensity: payload,
      }
    default:
      return state
  }
}

interface Props {
  children: JSX.Element
}

export class Provider extends React.Component<Props, IState> {
  private readonly devToolSend: (action: IAction) => void

  constructor(props: Props) {
    super(props)
    const self = this
    this.devToolSend = devtools(initialState, self)
  }

  readonly state: Readonly<IState> = {
    ...initialState,
  }

  dispatch = (action: IAction) => {
    this.setState(state => reducer(state, action), () => {
      console.log('callback')
      this.devToolSend(action)
    })
  }

  render() {
    const value = {
      ...this.state,
      dispatch: this.dispatch,
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer

export const connectNavigationScreen = (Component: any) => (props: any) => (
  <Consumer>
    {({dispatch, ...state}) => <Component dispatch={dispatch} state={state} {...props} />}
  </Consumer>
)

export const connect = (Component: any) => (props: any) => (
  <Consumer>
    {({dispatch, ...state}) => <Component dispatch={dispatch} state={state} {...props} />}
  </Consumer>
)
