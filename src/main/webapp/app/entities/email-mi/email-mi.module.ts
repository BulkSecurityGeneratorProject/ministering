import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    EmailMiComponent,
    EmailMiDetailComponent,
    EmailMiUpdateComponent,
    EmailMiDeletePopupComponent,
    EmailMiDeleteDialogComponent,
    emailRoute,
    emailPopupRoute
} from './';

const ENTITY_STATES = [...emailRoute, ...emailPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmailMiComponent,
        EmailMiDetailComponent,
        EmailMiUpdateComponent,
        EmailMiDeleteDialogComponent,
        EmailMiDeletePopupComponent
    ],
    entryComponents: [EmailMiComponent, EmailMiUpdateComponent, EmailMiDeleteDialogComponent, EmailMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringEmailMiModule {}
