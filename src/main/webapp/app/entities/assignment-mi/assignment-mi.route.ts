import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignmentMi } from 'app/shared/model/assignment-mi.model';
import { AssignmentMiService } from './assignment-mi.service';
import { AssignmentMiComponent } from './assignment-mi.component';
import { AssignmentMiDetailComponent } from './assignment-mi-detail.component';
import { AssignmentMiUpdateComponent } from './assignment-mi-update.component';
import { AssignmentMiDeletePopupComponent } from './assignment-mi-delete-dialog.component';
import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';

@Injectable({ providedIn: 'root' })
export class AssignmentMiResolve implements Resolve<IAssignmentMi> {
    constructor(private service: AssignmentMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((assignment: HttpResponse<AssignmentMi>) => assignment.body));
        }
        return of(new AssignmentMi());
    }
}

export const assignmentRoute: Routes = [
    {
        path: 'assignment-mi',
        component: AssignmentMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.assignment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'assignment-mi/:id/view',
        component: AssignmentMiDetailComponent,
        resolve: {
            assignment: AssignmentMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.assignment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'assignment-mi/new',
        component: AssignmentMiUpdateComponent,
        resolve: {
            assignment: AssignmentMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.assignment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'assignment-mi/:id/edit',
        component: AssignmentMiUpdateComponent,
        resolve: {
            assignment: AssignmentMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.assignment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assignmentPopupRoute: Routes = [
    {
        path: 'assignment-mi/:id/delete',
        component: AssignmentMiDeletePopupComponent,
        resolve: {
            assignment: AssignmentMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.assignment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
