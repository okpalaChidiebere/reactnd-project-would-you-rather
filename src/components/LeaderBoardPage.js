import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ColorThief from 'colorthief'

class LeaderBoardPage extends Component{

    state = {
        colorImages: [],
    }

    handleImage = (ref) => {
        const colorThief = new ColorThief()
         const img = ref
        const result = `rgb(${colorThief.getColor(img, 25).join(',')})` 
        this.setState(curr => ({
            colorImages: [...curr.colorImages, result]
        }))
    }

    render(){
        const { users } = this.props

        const leaderBoardList = Object.values(users).map(({name, avatarURL, answers, questions}) => (Object.assign({},{
            name,
            avatarURL,
            questionAskedCount: Object.keys(answers).length,
            questionAnsweredCount: questions.length,
        })))
//"https://placekitten.com/408/287"

        return(
            <div>
                {JSON.stringify(this.state)}
                {
                leaderBoardList.map((entry, index) => 
                    (<div className="leaderboard-container" key={index}>
                        <div className="poll-information-info-cover">
                            <div className="poll-user-image">
                                <img
                                crossOrigin={"anonymous"}
                                ref={(img) => this.imageRef = img} 
                                src={entry.avatarURL} alt={"example"} style={{margin: '1em auto'}}
                                onLoad={() => this.handleImage(this.imageRef)}/>       
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
                                    <div style={{textAlign: 'center', border: '1px solid #cccccc', margin: '1em auto',}}>
                                    score
				                    </div>
                                    <div className="score-number" style={{background: this.state.colorImages[index]}}>
                                    {(entry.questionAnsweredCount + entry.questionAskedCount)}
                                    </div> 
                                </div>
                            </div> 
			            </div>
                    </div>
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