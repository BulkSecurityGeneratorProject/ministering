import { Moment } from 'moment';
import { IOrgMi } from 'app/shared/model//org-mi.model';
import { IFamilyMi } from 'app/shared/model//family-mi.model';
import { IPhoneMi } from 'app/shared/model//phone-mi.model';
import { IEmailMi } from 'app/shared/model//email-mi.model';
import { ISocialMediaMi } from 'app/shared/model//social-media-mi.model';
import { INotesMi } from 'app/shared/model//notes-mi.model';
import { ICompanionMi } from 'app/shared/model//companion-mi.model';
import { IMinistryMi } from 'app/shared/model//ministry-mi.model';

export const enum FamilyType {
    INFANT = 'INFANT',
    PRIMARY = 'PRIMARY',
    YW = 'YW',
    YM = 'YM',
    RELIEF_SOCIETY = 'RELIEF_SOCIETY',
    ELDER = 'ELDER',
    HP = 'HP'
}

export interface IMemberMi {
    id?: number;
    type?: FamilyType;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthdate?: Moment;
    orgs?: IOrgMi[];
    family?: IFamilyMi;
    phone?: IPhoneMi;
    email?: IEmailMi;
    socialMedia?: ISocialMediaMi;
    notes?: INotesMi;
    companion?: ICompanionMi;
    ministry?: IMinistryMi;
}

export class MemberMi implements IMemberMi {
    constructor(
        public id?: number,
        public type?: FamilyType,
        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public birthdate?: Moment,
        public orgs?: IOrgMi[],
        public family?: IFamilyMi,
        public phone?: IPhoneMi,
        public email?: IEmailMi,
        public socialMedia?: ISocialMediaMi,
        public notes?: INotesMi,
        public companion?: ICompanionMi,
        public ministry?: IMinistryMi
    ) {}
}
