import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    StewardshipMiComponent,
    StewardshipMiDetailComponent,
    StewardshipMiUpdateComponent,
    StewardshipMiDeletePopupComponent,
    StewardshipMiDeleteDialogComponent,
    stewardshipRoute,
    stewardshipPopupRoute
} from './';

const ENTITY_STATES = [...stewardshipRoute, ...stewardshipPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StewardshipMiComponent,
        StewardshipMiDetailComponent,
        StewardshipMiUpdateComponent,
        StewardshipMiDeleteDialogComponent,
        StewardshipMiDeletePopupComponent
    ],
    entryComponents: [
        StewardshipMiComponent,
        StewardshipMiUpdateComponent,
        StewardshipMiDeleteDialogComponent,
        StewardshipMiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringStewardshipMiModule {}
