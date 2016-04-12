import { bindActionCreators } from 'redux'
import Evaluator from '../helpers/Evaluator'

export function mount() {
  return dispatch => {
    const evaluator = new Evaluator
    evaluator.on('message', bindActionCreators(appendOutput, dispatch))
    return dispatch({ type: 'App.mount', evaluator })
  }
}

export function unmount() {
  return (dispatch, getState) => {
    getState().evaluator.unmount()
    return dispatch({ type: 'App.unmount' })
  }
}

export function update(script) {
  return (dispatch, getState) => {
    const { evaluator, history } = getState()
    evaluator.evaluate(script)
    return dispatch({ type: 'Editor.update', script })
  }
}

export function appendOutput(msg) {
  return { type: 'Output.append', method: msg.method, args: msg.args }
}
