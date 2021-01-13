/** Container Component */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import logo from "../icons/logo.svg";
import { setAuthedUser } from '../actions/authedUser'

class LoginPage extends Component {

    static propTypes = {
        users: PropTypes.object.isRequired,
    }

    handleLoginFormSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true })

        const { selectedUser } = values
        //console.log('values', selectedUser)
        if(selectedUser !== 'select')
            this.props.dispatch(setAuthedUser(selectedUser)) //we dispatch setting the userID as the authedUser in our Redux store

    }

    render(){

        const { users } = this.props

        return(
            <div className="login-page">
                <div className="login-page-header">
			        <h4>Welcome to Would You Rather App!</h4>
			        <p>Please sign in to Continue</p>
			    </div>
			    <div style={{margin: "0 auto", flex: 4, textAlign: "center"}}>
			        <img className="login-page-logo" src={logo} alt={logo}/>
                    <h1>Sign In</h1>
			    </div>
                
                <div style={{flex: 1}}>
			        <form className="login-form" onSubmit={this.handleLoginFormSubmit}>
                        <select defaultValue="select" name="selectedUser" style={{width: "100%"}}>
					        <option value="select" disabled>Select User</option>
                            {Object.keys(users).map((id, index) => (
                            <option value={id} key={index}>{`${users[id].name}`}</option>
                            ))}
				        </select>
                        <span id="notifyldSelectError" className="error_msg"></span>    
				        <p>
				            <button className="login-button" style={{width: "100%", color: "white", backgroundColor: "#4caf50"}}>Sign In</button>
				        </p>
			        </form>
			    </div>
		    </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    users
})

export default connect(mapStateToProps)(LoginPage) 