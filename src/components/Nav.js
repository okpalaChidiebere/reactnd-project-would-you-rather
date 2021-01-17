/* Container Component */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    static propTypes = {
        user: PropTypes.object,
    }

    redirect = () => <Redirect to='/' />

    render() {

        const { user } = this.props

        return(
            <div className="nav-container">
                <nav>
                    <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
                    <li><NavLink to='/add' activeClassName='active'>New Question</NavLink></li>
                    <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
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