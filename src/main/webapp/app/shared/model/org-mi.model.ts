import { IMemberMi } from 'app/shared/model//member-mi.model';

export interface IOrgMi {
    id?: number;
    name?: string;
    member?: IMemberMi;
}

export class OrgMi implements IOrgMi {
    constructor(public id?: number, public name?: string, public member?: IMemberMi) {}
}
