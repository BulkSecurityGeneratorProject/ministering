import { INotesMi } from 'app/shared/model//notes-mi.model';
import { IAssignmentMi } from 'app/shared/model//assignment-mi.model';

export interface IFamilyMi {
    id?: number;
    name?: string;
    coupleName?: string;
    address?: string;
    notes?: INotesMi;
    assignment?: IAssignmentMi;
}

export class FamilyMi implements IFamilyMi {
    constructor(
        public id?: number,
        public name?: string,
        public coupleName?: string,
        public address?: string,
        public notes?: INotesMi,
        public assignment?: IAssignmentMi
    ) {}
}
