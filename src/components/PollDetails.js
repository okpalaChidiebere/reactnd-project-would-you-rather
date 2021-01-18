import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isAnswered as handleIsAnswerd } from '../utils/helper'
import PollResults from './PollResults';
import PollQuestion from './PollQuestion'
import NotFoundPage from './NotFoundPage'

class PollDetails extends Component {

    static propTypes = {
        question_id: PropTypes.string, 
        isAnswerd: PropTypes.bool, 
        name: PropTypes.string, 
        avatarURL: PropTypes.string,
    }

    render(){

        const { question_id, isAnswerd, name, avatarURL } = this.props

        if(!question_id){
            return <NotFoundPage />
        }

        return(
            <div className="poll-information">
			<h4 className="poll-information-header">
                {isAnswerd
                ?`Asked by ${name}`
                :`${name} asks:`}
            </h4>
			<div className="poll-information-info-cover">
				<div className="poll-user-image">
					<img src={avatarURL} alt={avatarURL} />
				</div>
				<div className="poll-short-question">
                    {!isAnswerd
                    ? <PollQuestion 
                    question_id={question_id}
                    />
                    : <PollResults 
                    question_id={question_id}
                    />}
				</div>
			</div>
		</div>
        )
    }
}

const mapStateToProps = ({ questions, users, authedUser }, ownProps ) => {

    const { question_id } = ownProps.match.params
    const question = questions[question_id]

    const isAnswerd = question?handleIsAnswerd(questions, question_id, authedUser):null

    //we return null for every props key when question is undefined. eg /questions/someinvalidurl
    return{
        isAnswerd,
        question_id: question?question_id:null,
        avatarURL: question?users[question.author].avatarURL:null,
        name: question?users[question.author].name:null,
    }
}

export default connect(mapStateToProps)(PollDetails) 