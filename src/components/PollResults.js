import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AnsweredPoll from './AnsweredPoll'

class PollResults extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
        numOfVotes: PropTypes.number.isRequired, 
        optionUserVoted: PropTypes.string.isRequired, 
        voteCountOptionOne: PropTypes.number.isRequired, 
        voteCountOptionTwo: PropTypes.number.isRequired,
    }

    render(){

        const { question, numOfVotes, optionUserVoted,
            voteCountOptionOne, voteCountOptionTwo } = this.props

        return(
            <div style={{display: "flex", flexDirection: "column"}}>
                <div className="vote-results">
                    <h4 style={{margin:"10px"}}>Results:</h4>
                    <AnsweredPoll 
                    isYourVote={optionUserVoted === 'optionOne'} 
                    text={question.optionOne.text} 
                    votedOption={voteCountOptionOne} 
                    totalNumOfVotes={numOfVotes}
                    />
                    <AnsweredPoll 
                    isYourVote={optionUserVoted === 'optionTwo'} 
                    text={question.optionTwo.text} 
                    votedOption={voteCountOptionTwo} 
                    totalNumOfVotes={numOfVotes}
                    />
                </div>
           </div>
        )
    }  
}

const mapStateToProps = ({ questions, users, authedUser }, ownProps ) => {

    const { question_id } = ownProps

    let numOfVotes = 0
    let voteCountOptionOne = 0
    let voteCountOptionTwo = 0
    const question = questions[question_id]
    Object.values(users).forEach(({answers}) => {
        answers[question_id] && numOfVotes++ //Number of votes
        answers[question_id] === 'optionOne' && voteCountOptionOne ++ //Number of people who voted for that optionOne
        answers[question_id] === 'optionTwo' && voteCountOptionTwo ++ //Number of people who voted for that optionTwo
    })

    return{
        question,
        numOfVotes,
        voteCountOptionOne,
        voteCountOptionTwo,
        optionUserVoted: users[authedUser].answers[question_id],
    }
}

export default connect(mapStateToProps)(PollResults)