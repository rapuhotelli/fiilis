import { IState } from './commonTypes'

let id = 0

import { IAction } from './store'

export default (initialState: IState, self: any) => {
  // @ts-ignore
  const reduxDevTools = window.devToolsExtension

  if (!reduxDevTools) {
    return () => {}
  }
  const instanceID = id
  id += 1

  const name = `fiilis - ${instanceID}`
  const features = {
    jump: true,
  }

  const devTools = reduxDevTools.connect({ name, features })
  devTools.init(initialState)

  return (action: IAction) => {
    devTools.send(action.type, self.state, {}, instanceID)
  }
}
