/* Container Component */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    static propTypes = {
        user: PropTypes.object,
    }

    handleNavigation = (event) => {
        if (!this.props.user) {
          event.preventDefault()
        }
    }

    render() {

        const { user } = this.props

        return(
            <div className="nav-container">
                <nav>
                    <li>
                        <NavLink to='/' 
                        onClick={this.handleNavigation}
                        exact activeClassName='active'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' 
                        onClick={this.handleNavigation}
                        activeClassName='active'>New Question</NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' 
                        onClick={this.handleNavigation}
                        activeClassName='active'>Leaderboard</NavLink>
                    </li>
                    <li></li>
                    {user !== null &&
                    <nav>
                        <li><span>{`Hello, ${user.name}`}</span></li>
                        <li><span className="nav-image" style={{backgroundImage: `url("${user.avatarURL}")`}}></span></li>
                        <li><span onClick={() => this.props.dispatch(setAuthedUser(null))} className="nav-log-out">Logout</span></li>
                    </nav>
                    }   
                </nav>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => ({ 
    user: authedUser === null ? null : users[authedUser] 
}) 

export default connect(mapStateToProps)(Nav)