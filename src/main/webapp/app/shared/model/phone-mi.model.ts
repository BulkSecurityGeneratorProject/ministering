import { IMemberMi } from 'app/shared/model//member-mi.model';

export const enum PhoneType {
    MOBILE = 'MOBILE',
    LAND_LAND = 'LAND_LAND',
    BUSINESS = 'BUSINESS'
}

export interface IPhoneMi {
    id?: number;
    type?: PhoneType;
    number?: string;
    textMsgOkay?: boolean;
    members?: IMemberMi[];
}

export class PhoneMi implements IPhoneMi {
    constructor(
        public id?: number,
        public type?: PhoneType,
        public number?: string,
        public textMsgOkay?: boolean,
        public members?: IMemberMi[]
    ) {
        this.textMsgOkay = false;
    }
}
