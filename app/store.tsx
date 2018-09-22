import * as React from 'react'

export type Dispatch = (action: Action) => void

interface State {
  selectedMood: string | null
  selectedIntensity: string | null
  dispatch: Dispatch
}

const initialState: State = {
  selectedMood: null,
  selectedIntensity: null,
  dispatch: () => {},
}

const Context = React.createContext(initialState)

interface Action {
  type: string,
  payload?: any
}

type Reducer = (state: any, action: Action) => State

const reducer: Reducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'RESET':
      return initialState
    case 'SET_MOOD':
      return {
        ...state,
        selectedMood: payload,
      }
    case 'SET_INTENSITY':
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

export class Provider extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    ...initialState,
    dispatch: (action: Action) => {
      this.setState(state => reducer(state, action))
    },
  }

  render() {
    return (
      <Context.Provider value={this.state}>
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
