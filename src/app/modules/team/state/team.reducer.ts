import * as teamActions from './team.actions';

const initalState = {
    loading: false,
    loaded: false,
    data: {},
    type: '',
    error: ''
}

export function teamReducer(state = initalState, action: any){
    switch(action.type){
        case teamActions.TeamActionsTypes.LOAD_TEAMS_SUCCESS: {
            return {
                ...state,
                data: {
                    teams: action.payload
                },
                loaded: true
            }
        }
        case teamActions.TeamActionsTypes.LOAD_TEAMS_FAIL: {
            return {
                ...state,
                error: action.payload,
                loaded: false
            }
        }

        case teamActions.TeamActionsTypes.CREATE_TEAM_SUCCESS:{
            return {
                ...state,
            }
        }
        case teamActions.TeamActionsTypes.CREATE_TEAM_FAIL:{
            return{
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