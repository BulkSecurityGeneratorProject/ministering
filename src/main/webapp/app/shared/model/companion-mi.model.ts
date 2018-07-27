import { IMemberMi } from 'app/shared/model//member-mi.model';
import { ICompanionshipMi } from 'app/shared/model//companionship-mi.model';

export interface ICompanionMi {
    id?: number;
    members?: IMemberMi[];
    companionships?: ICompanionshipMi[];
}

export class CompanionMi implements ICompanionMi {
    constructor(public id?: number, public members?: IMemberMi[], public companionships?: ICompanionshipMi[]) {}
}
