import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotesMi } from 'app/shared/model/notes-mi.model';
import { NotesMiService } from './notes-mi.service';
import { NotesMiComponent } from './notes-mi.component';
import { NotesMiDetailComponent } from './notes-mi-detail.component';
import { NotesMiUpdateComponent } from './notes-mi-update.component';
import { NotesMiDeletePopupComponent } from './notes-mi-delete-dialog.component';
import { INotesMi } from 'app/shared/model/notes-mi.model';

@Injectable({ providedIn: 'root' })
export class NotesMiResolve implements Resolve<INotesMi> {
    constructor(private service: NotesMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((notes: HttpResponse<NotesMi>) => notes.body));
        }
        return of(new NotesMi());
    }
}

export const notesRoute: Routes = [
    {
        path: 'notes-mi',
        component: NotesMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.notes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notes-mi/:id/view',
        component: NotesMiDetailComponent,
        resolve: {
            notes: NotesMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.notes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notes-mi/new',
        component: NotesMiUpdateComponent,
        resolve: {
            notes: NotesMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.notes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notes-mi/:id/edit',
        component: NotesMiUpdateComponent,
        resolve: {
            notes: NotesMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.notes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notesPopupRoute: Routes = [
    {
        path: 'notes-mi/:id/delete',
        component: NotesMiDeletePopupComponent,
        resolve: {
            notes: NotesMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.notes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
