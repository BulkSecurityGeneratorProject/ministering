import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    PhoneMiComponent,
    PhoneMiDetailComponent,
    PhoneMiUpdateComponent,
    PhoneMiDeletePopupComponent,
    PhoneMiDeleteDialogComponent,
    phoneRoute,
    phonePopupRoute
} from './';

const ENTITY_STATES = [...phoneRoute, ...phonePopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PhoneMiComponent,
        PhoneMiDetailComponent,
        PhoneMiUpdateComponent,
        PhoneMiDeleteDialogComponent,
        PhoneMiDeletePopupComponent
    ],
    entryComponents: [PhoneMiComponent, PhoneMiUpdateComponent, PhoneMiDeleteDialogComponent, PhoneMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringPhoneMiModule {}
