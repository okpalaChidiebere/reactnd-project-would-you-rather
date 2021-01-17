import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { add3Dots } from '../utils/helper'

const Poll = ({ poll }) => {

    return (
        <div className="poll-information">
			<h4 className="poll-information-header">{`${poll.author} asks:`}</h4>
			<div className="poll-information-info-cover">
				<div className="poll-user-image">
					<img src={poll.avatarURL} alt={poll.avatarURL} />
				</div>
				<div className="poll-short-question">
					<p style={{fontWeight: "bold"}}> Would You Rather ...  </p>
					<p>{`...${add3Dots(poll.optionOne.text, (poll.optionOne.text.length/2))}`} </p>
					<p style={{textAlign: "center"}}>
						<Link to={`/questions/${poll.id}`} className='tweet'>
							<span className="view-poll">View poll</span>
						</Link>
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
  