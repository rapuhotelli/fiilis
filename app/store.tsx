import * as React from 'react'

interface State {
  selectedMood: string | null
  selectedIntensity: string | null
  dispatch: (action: Action) => void
}

const initialState: State = {
  selectedMood: null,
  selectedIntensity: null,
  dispatch: () => {},
}

const Context = React.createContext(initialState)

interface Action {
  type: string,
  payload: any
}

type Reducer = (state: any, action: Action) => State

const reducer: Reducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'SET_MOOD':
      return {
        ...state,
        selectedMood: payload,
      }
    default:
      return state
  }
}

export class Provider extends React.Component<State> {
  readonly state: Readonly<State> = {
    ...initialState,
    dispatch: (action: Action) => {
      this.setState(state => reducer(state, action))
    },
  }

  render() {
    console.log('state is now', this.state)
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
export const Consumer = Context.Consumer
