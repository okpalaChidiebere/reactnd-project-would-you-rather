import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { handleAddQuestion } from '../actions/shared'



class NewQuestionPage extends Component{

    state = {
        optionOneText: '',
        optionTwoText: '',
    }

    handleChange = event => {

        const { name, value } = event.target;
        this.setState((currentState) => ({ 
            ...currentState,
            [name]: value,
        }))
    }

    handleOnsubmit = (event) => {
        event.preventDefault(); //this will prevent the page from reloading

        const { dispatch } = this.props
        const formValues = serializeForm(event.target, { hash: true })
        const { optionOneText, optionTwoText } = formValues
        
        dispatch(handleAddQuestion({
            optionOneText,
            optionTwoText,
        }))

    }

    render(){

        const { optionOneText, optionTwoText } = this.state;
        
        return(
            <div className="poll-information">
                <h1 className="new-question-header">Create New Question</h1>
			    <div className="poll-short-question">
                    <form className="new-question-form" onSubmit={this.handleOnsubmit}>
                        <p>Complete the question: </p>
                        <h3>Would you rather...</h3>
                        <p>
                          <input 
                          type='text' 
                          name="optionOneText" 
                          placeholder='Enter Option One Text Here'
                          value={optionOneText}
                          onChange={this.handleChange} />
                        </p>
                        <div className="orText"><span>OR</span></div>
                        <p>
                            <input 
                            type='text' 
                            name="optionTwoText" 
                            placeholder='Enter Option Two Text Here'
                            value={optionTwoText}
                            onChange={this.handleChange} />
                        </p>
                        <p>
                            <button 
                            className="login-button" 
                            style={{width: "100%", color: "white", backgroundColor: "#4caf50"}}
                            disabled={optionOneText === '' || optionTwoText === ''}
                            >Submit
                            </button>
				        </p>
                    </form>
                </div>
		    </div>
        )   
    }
}


export default connect()(NewQuestionPage)