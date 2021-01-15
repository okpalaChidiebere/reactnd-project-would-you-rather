import React from 'react'
import PropTypes from 'prop-types'

const AnsweredPoll = ({isYourVote, text, votedOption, totalNumOfVotes}) => {

    const percentageVoteOption = (votedOption/totalNumOfVotes) * 100

    return (
        <div className="vote-option-result" style={{background: isYourVote?"#d6f5d6":null}}>
            <p>{`${text}?`}</p>
		    <div className="vote-result-percentage">
                <div style={{width:`${percentageVoteOption}%`,}}>
                    <span style={{float:"right"}}>{`${percentageVoteOption}%`}</span>
                </div>
            </div>
		    <div style={{textAlign: "center"}}>{`${votedOption} out of ${totalNumOfVotes} votes`}</div>
		    {isYourVote && <div className="option-result-your-vote" >Your Vote</div>}
	    </div>
    )
}

AnsweredPoll.protoTypes = {
    isYourVote: PropTypes.bool.isRequired, 
    text: PropTypes.string.isRequired, 
    votedOption: PropTypes.number.isRequired, 
    totalNumOfVotes: PropTypes.number.isRequired,
}

export default AnsweredPoll