import * as React from 'react'

const initialState = {
  selectedMood: null,
  selectedIntensity: null,
}

const Context = React.createContext(initialState)

type State = typeof initialState
export class Provider extends React.Component<State> {
  state = {
    ...initialState,
  }

  actions = {
    setMood: (name: string) => {
      // this.setState({selectedMood: name})
      if (this.state.selectedMood !== name) {
        this.setState(state => {
          return {selectedMood: name}
        })
      }
    },
    setIntensity: (name: string) => {
      this.setState({selectedIntensity: name})
    },
  }

  render() {
    console.log('state is now:', this.state)
    const store = {
      state: this.state,
      actions: this.actions,
    }
    return (
      <Context.Provider value={store}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

interface ConsumerProps {
  children: Function,
}
export class Consumer extends React.Component<ConsumerProps> {
  getActions = (store) => {
    return store.actions
  }
  render() {
    const { children = () => {} } = this.props

    return (
      <Context.Consumer>
        {store => children(this.getActions(store))}
      </Context.Consumer>
    )
  }
}
