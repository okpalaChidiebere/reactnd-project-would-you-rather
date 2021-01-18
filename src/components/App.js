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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'
import PollDetails from './PollDetails'
import LeaderBoardPage from './LeaderBoardPage'
import NewQuestionPage from './NewQuestionPage'
import NotFoundPage from './NotFoundPage'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <header className="App-header"><span>React App</span></header>
        <Nav />
        <div className="site">
        {this.props.notLoggedIn === true
          ? <LoginPage />
        : <div>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/questions/:question_id' component={PollDetails} />
            <Route path='/add' component={NewQuestionPage} />
            <Route path='/leaderboard' component={LeaderBoardPage}/>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        }
        </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    notLoggedIn: authedUser === null
  }
}

export default connect(mapStateToProps)(App) 