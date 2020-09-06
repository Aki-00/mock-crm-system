import * as accountActions from './account.actions';

const initalState = {
    loading: false,
    loaded: false,
    data: {},
    type: '',
    error: ''
}

export function accountReducer(state = initalState, action: any){
    switch(action.type){
        case accountActions.AccountActionsTypes.LOAD_ACCOUNTS_SUCCESS: {
            return {
                ...state,
                data: {
                    accounts: action.payload
                },
                loaded: true
            }
        }
        case accountActions.AccountActionsTypes.LOAD_ACCOUNTS_FAIL: {
            return {
                ...state,
                error: action.payload,
                loaded: false
            }
        }
        default: {
            return state;
        } 
}
}