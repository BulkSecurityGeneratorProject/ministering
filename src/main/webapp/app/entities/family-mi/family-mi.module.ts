import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    FamilyMiComponent,
    FamilyMiDetailComponent,
    FamilyMiUpdateComponent,
    FamilyMiDeletePopupComponent,
    FamilyMiDeleteDialogComponent,
    familyRoute,
    familyPopupRoute
} from './';

const ENTITY_STATES = [...familyRoute, ...familyPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FamilyMiComponent,
        FamilyMiDetailComponent,
        FamilyMiUpdateComponent,
        FamilyMiDeleteDialogComponent,
        FamilyMiDeletePopupComponent
    ],
    entryComponents: [FamilyMiComponent, FamilyMiUpdateComponent, FamilyMiDeleteDialogComponent, FamilyMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringFamilyMiModule {}
