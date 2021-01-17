import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import { handleVoteQuestion } from '../actions/shared'

class PollQuestion extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
    }

    handleSubmitVote = (qid, authedUser) => (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        const formValues = serializeForm(e.target, { hash: true })
        const { voteOption } = formValues

        //voteOption?console.log("userVoted"):console.log('user did not vote')
        voteOption && dispatch(handleVoteQuestion({
            authedUser,
            qid,
            answer: voteOption,
        })) 
    }

    render(){

        const { question, authedUser } = this.props

        return(
            <div className="vote-question">
                <form onSubmit={this.handleSubmitVote(question.id, authedUser)}>
                    <h2>Would you rather?</h2>
				    <p>
					    <input
					    type="radio"
					    name="voteOption"
                        value={Object.keys(question).find(key => question[key].text === question.optionOne.text)}
					    /><label>{`${question.optionOne.text}?`}</label>        
				    </p>
				    <p>
					    <input
					    type="radio"
					    name="voteOption"
                        value={Object.keys(question).find(key => question[key].text === question.optionTwo.text)}
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

const mapStateToProps = ({ questions, authedUser }, { question_id }) => ({
    question: questions[question_id],
    authedUser,
})

const ConnectedPollQuestion = connect(mapStateToProps)(PollQuestion)

ConnectedPollQuestion.propTypes = {
    question_id: PropTypes.string.isRequired,
}

export default ConnectedPollQuestion