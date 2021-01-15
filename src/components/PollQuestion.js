import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'

class PollQuestion extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
    }

    handleSubmitVote = (e) => {
        e.preventDefault()

        const formValues = serializeForm(e.target, { hash: true })
        const { voteOption } = formValues

        voteOption?console.log("userVoted"):console.log('user did not vote')
        //TODO: update Store by invoking dispatch
    }

    render(){

        const { question } = this.props

        return(
            <div className="vote-question">
                <form onSubmit={this.handleSubmitVote}>
                    <h2>Would you rather?</h2>
				    <p>
					    <input
					    type="radio"
					    name="voteOption"
                        value="find $50 yourself?"
					    /><label>{`${question.optionOne.text}?`}</label>        
				    </p>
				    <p>
					    <input
					    type="radio"
					    name="voteOption"
                        value="Have your friend find $500?"
					    /><label>{`${question.optionTwo.text}?`}</label>        
				    </p>
                    <p>
				        <button className="login-button" style={{width: "100%", color: "white", backgroundColor: "#4caf50"}}>Subnit</button>
				    </p>
                </form>
			</div>
        )
    }
}

const mapStateToProps = ({ questions }, { question_id }) => ({
    question: questions[question_id],
})

const ConnectedPollQuestion = connect(mapStateToProps)(PollQuestion)

ConnectedPollQuestion.propTypes = {
    question_id: PropTypes.string.isRequired,
}

export default ConnectedPollQuestion