/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react'
import MainNav from './navigation'
import { clearStorage } from './storage'
import { Consumer, Provider } from './store'

export default class App extends React.Component<{}> {
  componentDidMount() {
    clearStorage()
  }

  render() {
    return (
      <Provider>
        <Consumer>
          {({dispatch}) => <MainNav screenProps={{dispatch}} />}
        </Consumer>
      </Provider>
    )
  }
}
