import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType } from '@ngrx/effects';
import * as teamActions from './team.actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { TeamService } from '../team.service';
import { EMPTY, of } from 'rxjs';


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

      constructor(private actions$: Actions, private teamService: TeamService){}
}