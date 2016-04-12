import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AppActions from '../actions/AppActions'

import style from '../styles/app'

class App extends Component {

  static propTypes = {
    output: React.PropTypes.string.isRequired,
    actions: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.props.actions.mount()
  }

  componentWillUnmount() {
    this.props.actions.unmount()
  }

  onChange(event) {
    this.props.actions.update(event.target.value)
  }

  render() {
    return (
      <app className={style.app}>
        <textarea className={style.input} onChange={this.onChange} autoFocus={true}></textarea>
        <pre className={style.output}>{this.props.output}</pre>
      </app>
    )
  }
}

export default connect(
  state => state,
  dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
  })
)(App)
