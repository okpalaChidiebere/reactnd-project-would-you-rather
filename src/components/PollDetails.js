import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isAnswered as handleIsAnswerd } from '../utils/helper'
import PollResults from './PollResults';

class PollDetails extends Component {

    static propTypes = {
        question_id: PropTypes.string.isRequired, 
        isAnswerd: PropTypes.bool.isRequired, 
        name: PropTypes.string.isRequired, 
        avatarURL: PropTypes.string.isRequired,
    }

    render(){
        const { question_id, isAnswerd, name, avatarURL } = this.props

        return(
            <div className="poll-information">
			<h4 className="poll-information-header">{`Asked by ${name}`}</h4>
			<div className="poll-information-info-cover">
				<div className="poll-user-image">
					<img src={avatarURL} alt={avatarURL} />
				</div>
				<div className="poll-short-question">
                    {!isAnswerd
                    ? <div>TODO: Poll Question</div>
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
    const isAnswerd = handleIsAnswerd(questions, question_id, authedUser)

    return{
        isAnswerd,
        question_id: question_id?question_id:null,
        avatarURL: users[question.author].avatarURL,
        name: users[question.author].name,
    }
}

export default connect(mapStateToProps)(PollDetails) 