import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    AssignmentMiComponent,
    AssignmentMiDetailComponent,
    AssignmentMiUpdateComponent,
    AssignmentMiDeletePopupComponent,
    AssignmentMiDeleteDialogComponent,
    assignmentRoute,
    assignmentPopupRoute
} from './';

const ENTITY_STATES = [...assignmentRoute, ...assignmentPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AssignmentMiComponent,
        AssignmentMiDetailComponent,
        AssignmentMiUpdateComponent,
        AssignmentMiDeleteDialogComponent,
        AssignmentMiDeletePopupComponent
    ],
    entryComponents: [
        AssignmentMiComponent,
        AssignmentMiUpdateComponent,
        AssignmentMiDeleteDialogComponent,
        AssignmentMiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringAssignmentMiModule {}
