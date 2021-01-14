import React from 'react'
import PropTypes from 'prop-types'
import { add3Dots } from '../utils/helper'

const Poll = ({ poll }) => {

    const loadPoolDetailsPage = (questionId) => {
        //console.log(questionId)
        //TODO: rotue to poll details page
    }
    return (
        <div className="poll-information">
			<h4 className="poll-information-header">{`${poll.name} asks:`}</h4>
			<div className="poll-information-info-cover">
				<div className="poll-user-image">
					<img src={poll.avatarURL} alt={poll.avatarURL} />
				</div>
				<div className="poll-short-question">
					<p style={{fontWeight: "bold"}}> Would You Rather ...  </p>
					<p>{`...${add3Dots(poll.optionOne.text, (poll.optionOne.text.length/2))}`} </p>
					<p style={{textAlign: "center"}}>
						<span className="view-poll" onClick={() => loadPoolDetailsPage(poll.id)} >View poll</span>
					</p>
				</div>
			</div>
		</div>
    )
}


Poll.protoTypes = {
    poll: PropTypes.object.isRequired
}
  
export default Poll
  