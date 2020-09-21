export interface Account {
    idAccount?: number;
    email: string;
    password: string;
    nameRole?: string;
    firstName: string;
    lastName: string;
    fullName?:string;
    gender?: string;
    team?:string;
    roleInTeam?:string;
    isChecked?:boolean;
}