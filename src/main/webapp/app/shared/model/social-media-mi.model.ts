import { IMemberMi } from 'app/shared/model//member-mi.model';

export const enum SocialMediaType {
    FACEBOOK = 'FACEBOOK',
    TWITTER = 'TWITTER',
    GOOGLE = 'GOOGLE',
    WEB_SITE = 'WEB_SITE',
    BUSINESS = 'BUSINESS'
}

export interface ISocialMediaMi {
    id?: number;
    typeype?: SocialMediaType;
    url?: string;
    members?: IMemberMi[];
}

export class SocialMediaMi implements ISocialMediaMi {
    constructor(public id?: number, public typeype?: SocialMediaType, public url?: string, public members?: IMemberMi[]) {}
}
