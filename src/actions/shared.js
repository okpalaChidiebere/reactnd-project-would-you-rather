import { getInitialData } from '../api/api'
import { getUsers } from './users'
import { getQuestions } from './questions'
import { setAuthedUser } from './authedUser'

//TODO: implement authentication later. Hard COded for testing for now
const AUTHED_ID = 'tylermcginnis'


export const handleInitialData = () => async (dispatch) => {

    try {

        const { users, questions } = await getInitialData()
        dispatch(getUsers(users))
        dispatch(getQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID)) //we dispatch setting the username as the authedUser in our Redux store
    }catch(e){
        console.warn('ERROR!', e)
        alert("Error fetching data")
    }
} 
