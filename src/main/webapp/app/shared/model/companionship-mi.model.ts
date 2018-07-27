import { IStewardshipMi } from 'app/shared/model//stewardship-mi.model';
import { INotesMi } from 'app/shared/model//notes-mi.model';
import { ICompanionMi } from 'app/shared/model//companion-mi.model';
import { IMinistryMi } from 'app/shared/model//ministry-mi.model';

export interface ICompanionshipMi {
    id?: number;
    name?: string;
    companionship?: IStewardshipMi;
    notes?: INotesMi;
    stewardship?: IStewardshipMi;
    companion?: ICompanionMi;
    ministry?: IMinistryMi;
}

export class CompanionshipMi implements ICompanionshipMi {
    constructor(
        public id?: number,
        public name?: string,
        public companionship?: IStewardshipMi,
        public notes?: INotesMi,
        public stewardship?: IStewardshipMi,
        public companion?: ICompanionMi,
        public ministry?: IMinistryMi
    ) {}
}
