import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    SocialMediaMiComponent,
    SocialMediaMiDetailComponent,
    SocialMediaMiUpdateComponent,
    SocialMediaMiDeletePopupComponent,
    SocialMediaMiDeleteDialogComponent,
    socialMediaRoute,
    socialMediaPopupRoute
} from './';

const ENTITY_STATES = [...socialMediaRoute, ...socialMediaPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SocialMediaMiComponent,
        SocialMediaMiDetailComponent,
        SocialMediaMiUpdateComponent,
        SocialMediaMiDeleteDialogComponent,
        SocialMediaMiDeletePopupComponent
    ],
    entryComponents: [
        SocialMediaMiComponent,
        SocialMediaMiUpdateComponent,
        SocialMediaMiDeleteDialogComponent,
        SocialMediaMiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringSocialMediaMiModule {}
