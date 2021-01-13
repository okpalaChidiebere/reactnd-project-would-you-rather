/* Container Component */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    static propTypes = {
        user: PropTypes.object,
    }

    render() {

        const { user } = this.props

        return(
            <div className="nav-container">
                <nav>
                    <li><a className="active" href="#home">Home</a></li>
                    <li><a href="#news">New Question</a></li>
                    <li><a href="#contact">Leaderboard</a></li>
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