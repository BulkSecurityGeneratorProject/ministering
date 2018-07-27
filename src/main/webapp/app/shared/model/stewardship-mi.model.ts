import { ICompanionshipMi } from 'app/shared/model//companionship-mi.model';
import { IAssignmentMi } from 'app/shared/model//assignment-mi.model';
import { IMinistryMi } from 'app/shared/model//ministry-mi.model';

export interface IStewardshipMi {
    id?: number;
    companionships?: ICompanionshipMi[];
    assignment?: IAssignmentMi;
    ministry?: IMinistryMi;
}

export class StewardshipMi implements IStewardshipMi {
    constructor(
        public id?: number,
        public companionships?: ICompanionshipMi[],
        public assignment?: IAssignmentMi,
        public ministry?: IMinistryMi
    ) {}
}
