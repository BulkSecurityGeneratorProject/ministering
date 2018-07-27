import { IMemberMi } from 'app/shared/model//member-mi.model';
import { ICompanionshipMi } from 'app/shared/model//companionship-mi.model';
import { IStewardshipMi } from 'app/shared/model//stewardship-mi.model';

export interface IMinistryMi {
    id?: number;
    members?: IMemberMi[];
    companionships?: ICompanionshipMi[];
    stewardships?: IStewardshipMi[];
}

export class MinistryMi implements IMinistryMi {
    constructor(
        public id?: number,
        public members?: IMemberMi[],
        public companionships?: ICompanionshipMi[],
        public stewardships?: IStewardshipMi[]
    ) {}
}
