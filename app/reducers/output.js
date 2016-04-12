import { format } from 'util'

export default (state = '', action) => {
  switch (action.type) {
    case 'Output.append':
      if (action.method === 'clear') return ''
      return state + format(...action.args) + '\n'
    case 'Editor.update':
      return ''
    default:
      return state
  }
}
