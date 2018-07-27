import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    OrgMiComponent,
    OrgMiDetailComponent,
    OrgMiUpdateComponent,
    OrgMiDeletePopupComponent,
    OrgMiDeleteDialogComponent,
    orgRoute,
    orgPopupRoute
} from './';

const ENTITY_STATES = [...orgRoute, ...orgPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [OrgMiComponent, OrgMiDetailComponent, OrgMiUpdateComponent, OrgMiDeleteDialogComponent, OrgMiDeletePopupComponent],
    entryComponents: [OrgMiComponent, OrgMiUpdateComponent, OrgMiDeleteDialogComponent, OrgMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringOrgMiModule {}
