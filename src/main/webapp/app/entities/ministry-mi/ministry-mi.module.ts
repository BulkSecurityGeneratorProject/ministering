import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    MinistryMiComponent,
    MinistryMiDetailComponent,
    MinistryMiUpdateComponent,
    MinistryMiDeletePopupComponent,
    MinistryMiDeleteDialogComponent,
    ministryRoute,
    ministryPopupRoute
} from './';

const ENTITY_STATES = [...ministryRoute, ...ministryPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MinistryMiComponent,
        MinistryMiDetailComponent,
        MinistryMiUpdateComponent,
        MinistryMiDeleteDialogComponent,
        MinistryMiDeletePopupComponent
    ],
    entryComponents: [MinistryMiComponent, MinistryMiUpdateComponent, MinistryMiDeleteDialogComponent, MinistryMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringMinistryMiModule {}
