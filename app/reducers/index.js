import { combineReducers } from 'redux'
import evaluator from './evaluator'
import output from './output'

export default combineReducers({
  evaluator,
  output
})
