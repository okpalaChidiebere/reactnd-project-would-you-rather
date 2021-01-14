import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Poll from './Poll'

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
        const { answerdQuestions, questions } = this.props

        const isAnswered = (question) => {
            return Object.keys(answerdQuestions).find((questionId) => questionId === question)?true:false
        }

        const pollList = listUnAnswered 
        ? Object.values(questions).filter(question => !isAnswered(question.id))
        : Object.values(questions).filter(question => isAnswered(question.id))

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
				        {pollList.map( poll => (
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
    answerdQuestions: users[authedUser].answers,
    questions: Object.values(questions).map(question => ({ 
        ...question, 
        avatarURL: users[question.author].avatarURL,
        name: users[question.author].name,
    })).sort((a,b) => b.timestamp - a.timestamp), //sort by the most recently created (top) to the least recently created (bottom)
})

export default connect(mapStateToProps)(Dashboard) 