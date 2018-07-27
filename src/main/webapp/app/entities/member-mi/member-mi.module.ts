import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    MemberMiComponent,
    MemberMiDetailComponent,
    MemberMiUpdateComponent,
    MemberMiDeletePopupComponent,
    MemberMiDeleteDialogComponent,
    memberRoute,
    memberPopupRoute
} from './';

const ENTITY_STATES = [...memberRoute, ...memberPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MemberMiComponent,
        MemberMiDetailComponent,
        MemberMiUpdateComponent,
        MemberMiDeleteDialogComponent,
        MemberMiDeletePopupComponent
    ],
    entryComponents: [MemberMiComponent, MemberMiUpdateComponent, MemberMiDeleteDialogComponent, MemberMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringMemberMiModule {}
