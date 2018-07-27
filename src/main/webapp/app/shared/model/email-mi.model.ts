import { IMemberMi } from 'app/shared/model//member-mi.model';

export const enum EmailType {
    INDIVIDUAL = 'INDIVIDUAL',
    HOUSEHOLD = 'HOUSEHOLD',
    BUSINESS = 'BUSINESS'
}

export interface IEmailMi {
    id?: number;
    type?: EmailType;
    address?: string;
    members?: IMemberMi[];
}

export class EmailMi implements IEmailMi {
    constructor(public id?: number, public type?: EmailType, public address?: string, public members?: IMemberMi[]) {}
}
