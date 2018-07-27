import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MinisteringSharedModule } from 'app/shared';
import {
    NotesMiComponent,
    NotesMiDetailComponent,
    NotesMiUpdateComponent,
    NotesMiDeletePopupComponent,
    NotesMiDeleteDialogComponent,
    notesRoute,
    notesPopupRoute
} from './';

const ENTITY_STATES = [...notesRoute, ...notesPopupRoute];

@NgModule({
    imports: [MinisteringSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NotesMiComponent,
        NotesMiDetailComponent,
        NotesMiUpdateComponent,
        NotesMiDeleteDialogComponent,
        NotesMiDeletePopupComponent
    ],
    entryComponents: [NotesMiComponent, NotesMiUpdateComponent, NotesMiDeleteDialogComponent, NotesMiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringNotesMiModule {}
