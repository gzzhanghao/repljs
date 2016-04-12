export default (state = null, action) => {

  switch (action.type) {

    case 'App.mount':
      return action.evaluator

    case 'App.unmount':
      return null

    default:
      return state
  }
}
