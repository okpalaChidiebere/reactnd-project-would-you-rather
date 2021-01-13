import { getInitialData } from '../api/api'
import { getUsers } from './users'
import { getQuestions } from './questions'


export const handleInitialData = () => async (dispatch) => {

    try {

        const { users, questions } = await getInitialData()
        dispatch(getUsers(users))
        dispatch(getQuestions(questions))
    }catch(e){
        console.warn('ERROR!', e)
        alert("Error fetching data")
    }
} 
