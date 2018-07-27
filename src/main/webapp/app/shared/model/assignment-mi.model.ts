import { IStewardshipMi } from 'app/shared/model//stewardship-mi.model';
import { IFamilyMi } from 'app/shared/model//family-mi.model';

export interface IAssignmentMi {
    id?: number;
    stewardships?: IStewardshipMi[];
    families?: IFamilyMi[];
}

export class AssignmentMi implements IAssignmentMi {
    constructor(public id?: number, public stewardships?: IStewardshipMi[], public families?: IFamilyMi[]) {}
}
