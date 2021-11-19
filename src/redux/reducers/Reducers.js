export const AuthReducer = (state = {name: '', token: '', isAdmin: ''}, action) => {
    switch (action.type){
        case 'VALIDATE_LOGIN': 
            return action.data

        default: 
            return state
    }
}


export const CardReducer = (state = {income: '', expense: '', net: '', incomeCount: '', expenseCount: '', categoryCount: ''}, action) => {
    switch (action.type){
        case 'CARD_DATA': 
            return action.data

        default: 
            return state
    }
}


export const SettingsReducer = (state = {currency: '', limit: '',}, action) => {
    switch (action.type){
        case 'SETTINGS_DATA': 
            return action.data

        default: 
            return state
    }
}

