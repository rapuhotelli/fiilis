/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react'
// import { StyleSheet } from 'react-native';
import MainNav from './navigation'
import { Consumer, Provider } from './store'

export default class App extends React.Component<{}> {
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

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/
