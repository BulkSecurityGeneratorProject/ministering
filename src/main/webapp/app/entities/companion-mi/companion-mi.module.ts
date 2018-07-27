import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    CompanionMiComponent,
    CompanionMiDetailComponent,
    CompanionMiUpdateComponent,
    CompanionMiDeletePopupComponent,
    CompanionMiDeleteDialogComponent,
    companionRoute,
    companionPopupRoute
} from './';

const ENTITY_STATES = [...companionRoute, ...companionPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanionMiComponent,
        CompanionMiDetailComponent,
        CompanionMiUpdateComponent,
        CompanionMiDeleteDialogComponent,
        CompanionMiDeletePopupComponent
    ],
    entryComponents: [CompanionMiComponent, CompanionMiUpdateComponent, CompanionMiDeleteDialogComponent, CompanionMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringCompanionMiModule {}
