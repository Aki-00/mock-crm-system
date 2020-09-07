import { Action } from '@ngrx/store';
import { Team } from '../../../models/team';

export enum TeamActionsTypes {
    LOAD_TEAMS = '[Teams] LOAD_TEAMS',
    LOAD_TEAMS_SUCCESS = '[Teams] LOAD_TEAMS_SUCCESS',
    LOAD_TEAMS_FAIL = '[Teams] LOAD_TEAMS_FAIL',

    CREATE_TEAM = '[Teams] CREATE_TEAM',
    CREATE_TEAM_SUCCESS = '[Teams] CREATE_TEAM_SUCCESS',
    CREATE_TEAM_FAIL = '[Teams] CREATE_TEAM_FAIL',
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

export class CreateTeam implements Action {
    readonly type = TeamActionsTypes.CREATE_TEAM;
    constructor(public payload: Team){}
}
export class CreateTeamSuccess implements Action {
    readonly type = TeamActionsTypes.CREATE_TEAM_SUCCESS;
    constructor(public payload: any){}
}

export class CreateTeamFail implements Action {
    readonly type = TeamActionsTypes.CREATE_TEAM_FAIL;
    constructor(public payload: any){}
}


export type Actions = LoadTeams |
                      LoadTeamsSuccess| 
                      LoadTeamsFail|
                      CreateTeam|
                      CreateTeamSuccess|
                      CreateTeamFail


 