import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as teamActions from './team.actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { TeamService } from '../team.service';
import { Team } from '../../../models/team';
import { EMPTY, of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';


@Injectable()
export class TeamEffects {
 
    loadTeams$ = createEffect(() => this.actions$.pipe(
        ofType(teamActions.TeamActionsTypes.LOAD_TEAMS ),
        mergeMap(() => this.teamService.getTeams()
          .pipe(
            map(teams => ({ type: teamActions.TeamActionsTypes.LOAD_TEAMS_SUCCESS, payload: teams })),
            catchError((err) => of({ type: teamActions.TeamActionsTypes.LOAD_TEAMS_FAIL, payload:  err}))
          ))
        )
      );    

      @Effect()
    createTeam$: Observable<Action> = this.actions$.pipe(
      ofType(teamActions.TeamActionsTypes.CREATE_TEAM),
      map((action: teamActions.CreateTeam) => action.payload),
      mergeMap((team: Team) => this.teamService.createTeam(team).pipe(
        map(
          (newTeam: Team) => {
            console.log('1111');
            
            return new teamActions.CreateTeamSuccess(newTeam)
          }
        ),
        catchError(err => of({ type: teamActions.TeamActionsTypes.CREATE_TEAM_FAIL, payload:  err}))
        ))
        );    

      constructor(private actions$: Actions, private teamService: TeamService, private router:Router){}
}