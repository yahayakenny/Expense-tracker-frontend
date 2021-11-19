export const AuthReducer = (state = {username: '', password: ''}, action) => {
    switch (action.type){
        case 'VALIDATE_LOGIN': 
            return action.data

        default: 
            return state
    }
}

export default AuthReducer;
