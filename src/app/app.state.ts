import { Account } from './models/account';
import { Team} from './models/team'

export interface AppState {
    readonly accounts: Account[];
    readonly teams: Team[];
}