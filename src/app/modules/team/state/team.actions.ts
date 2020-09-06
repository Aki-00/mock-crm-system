import { Action } from '@ngrx/store';
import { Team } from '../../../models/team';

export enum TeamActionsTypes {
    LOAD_TEAMS = '[Teams] LOAD_TEAMS',
    LOAD_TEAMS_SUCCESS = '[Teams] LOAD_TEAMS_SUCCESS',
    LOAD_TEAMS_FAIL = '[Teams] LOAD_TEAMS_FAIL',
}

// action to load api
export class LoadTeams implements Action {
    readonly type = TeamActionsTypes.LOAD_TEAMS;
}

// action call api success
export class LoadTeamsSuccess implements Action {
    readonly type = TeamActionsTypes.LOAD_TEAMS_SUCCESS;
    constructor(public payload: Team[]){}
}


// action call api fail
export class LoadTeamsFail implements Action {
    readonly type = TeamActionsTypes.LOAD_TEAMS_FAIL;
    constructor(public payload: string){}
}

export type Actions = LoadTeams |
                      LoadTeamsSuccess| 
                      LoadTeamsFail 
 