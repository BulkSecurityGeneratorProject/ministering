import { IMemberMi } from 'app/shared/model//member-mi.model';
import { ICompanionshipMi } from 'app/shared/model//companionship-mi.model';
import { IFamilyMi } from 'app/shared/model//family-mi.model';

export const enum NoteType {
    INDIVIDUAL = 'INDIVIDUAL',
    COMPANIONSHIP = 'COMPANIONSHIP',
    FAMILY = 'FAMILY'
}

export interface INotesMi {
    id?: number;
    type?: NoteType;
    note?: string;
    members?: IMemberMi[];
    companionships?: ICompanionshipMi[];
    families?: IFamilyMi[];
}

export class NotesMi implements INotesMi {
    constructor(
        public id?: number,
        public type?: NoteType,
        public note?: string,
        public members?: IMemberMi[],
        public companionships?: ICompanionshipMi[],
        public families?: IFamilyMi[]
    ) {}
}
