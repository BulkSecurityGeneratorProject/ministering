import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    CompanionshipMiComponent,
    CompanionshipMiDetailComponent,
    CompanionshipMiUpdateComponent,
    CompanionshipMiDeletePopupComponent,
    CompanionshipMiDeleteDialogComponent,
    companionshipRoute,
    companionshipPopupRoute
} from './';

const ENTITY_STATES = [...companionshipRoute, ...companionshipPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanionshipMiComponent,
        CompanionshipMiDetailComponent,
        CompanionshipMiUpdateComponent,
        CompanionshipMiDeleteDialogComponent,
        CompanionshipMiDeletePopupComponent
    ],
    entryComponents: [
        CompanionshipMiComponent,
        CompanionshipMiUpdateComponent,
        CompanionshipMiDeleteDialogComponent,
        CompanionshipMiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringCompanionshipMiModule {}
