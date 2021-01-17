import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TestColor from './TestColor'

class LeaderBoardPage extends Component{

    static propTypes = {
        users: PropTypes.object.isRequired,
    }

    render(){
        const { users } = this.props

        const leaderBoardList = Object.values(users).map(({name, avatarURL, answers, questions}) => (Object.assign({},{
            name,
            avatarURL,
            questionAskedCount: Object.keys(answers).length,
            questionAnsweredCount: questions.length,
        })))
        //Users should be ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered.
        .sort((a,b) => (b.questionAnsweredCount + b.questionAskedCount) - (a.questionAnsweredCount + a.questionAskedCount))

        return(
            <div>
                {
                leaderBoardList.map((entry, index) => (
                    (<div className="leaderboard-container" key={index}>
                        <TestColor key={index} imgSrc={entry.avatarURL}/>
                        <div className="poll-information-info-cover">
                            <div className="poll-user-image">
                                <img src={entry.avatarURL} alt={"example"} style={{margin: '1em auto'}}/>       
			                </div>
                            <div className="leaderboard-user-information">
                                <h2>{entry.name}</h2>
                                <p style={{borderBottom: '1px solid #cccccc'}}>
                                    <span> Answered Questions</span><span style={{float: 'right'}}>{entry.questionAnsweredCount}</span>        
				                </p>
                                <p>
                                    <span> Created Questions</span><span style={{float: 'right'}}>{entry.questionAskedCount}</span>        
                                </p>
                            </div>
                            <div className="leaderboard-score">
                                <div className="score-container">
                                    <div style={{textAlign: 'center', margin: '1em auto',}}>
                                    score
				                    </div>
                                    <div className="score-number" >
                                    {(entry.questionAnsweredCount + entry.questionAskedCount)}
                                    </div> 
                                </div>
                            </div> 
			            </div>
                    </div>
                    )
                ))
                }
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    users
})

export default connect(mapStateToProps)(LeaderBoardPage) 