/** Container Component

- Using the connect() function upgrades a component to a container. 
- Containers can read state from the store and dispatch actions. Without Container we will have 
to pass down the store as props which will be tedious when we have to many components to pass down to
- The first bracket is where we get the store through a callback function. We can be more specific 
about the slice of the store tree we want in that callback too
 */

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'
import PollDetails from './PollDetails'
import LeaderBoardPage from './LeaderBoardPage'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <div className="site">
        {this.props.loading === true
          ? <LoginPage />
        : <LeaderBoardPage />
        }
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App) 