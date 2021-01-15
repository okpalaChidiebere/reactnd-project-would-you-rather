import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Poll from './Poll'
import { isAnswered } from '../utils/helper'

class Dashboard extends Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,  //we specifiy this props is required
        answerdQuestions: PropTypes.object.isRequired
    }

    state = {
        listUnAnswered: true,  //we will bind our input field to to whatever the value of a certain property of a state is
    }

    orderList = () => {
        this.setState((currState) => ({
            listUnAnswered: !currState.listUnAnswered
        }))
    }


    render() {

        const { listUnAnswered } = this.state
        const { questions, authedUser, users } = this.props

        const pollList = listUnAnswered 
        ? Object.values(questions).filter(question => !isAnswered(questions, question.id, authedUser))
        : Object.values(questions).filter(question => isAnswered(questions, question.id, authedUser))

        //console.log(this.props) //to check the props we reured from mapStateToProps is what we want
      return (
        <div className="poll-list-container">
			<div className="tab">
			  <button className={`tablink ${listUnAnswered ? "active" : ""}`} onClick={() => this.orderList(this)}>Unanswerd Questions</button>
			  <button className={`tablink ${listUnAnswered ? "" : "active"}`} onClick={() => this.orderList(this)}>Answerd Questions</button>
			</div>
	        {/*JSON.stringify(pollList)*/}
			<div className="tabcontent">
				    <ul>
                        {Object.values(pollList)
                        .map(question => ({ 
                            ...question, 
                            avatarURL: users[question.author].avatarURL, //add the author's avatar for this poll to the question
                            name: users[question.author].name, //add the author's name for this poll to the question
                        }))
                        .sort((a,b) => b.timestamp - a.timestamp) //sort by the most recently created (top) to the least recently created (bottom)
                        .map( poll => (
                        <li key={poll.id}>
					        <Poll poll={poll} />
				        </li>
                        ))}
				    </ul>
			</div>
		</div>
      )
    }
}

const mapStateToProps = ({ questions, authedUser, users }) => ({
    questions,
    authedUser,
    users,
})

export default connect(mapStateToProps)(Dashboard) 