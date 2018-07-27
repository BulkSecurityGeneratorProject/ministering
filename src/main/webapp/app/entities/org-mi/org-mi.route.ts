import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgMi } from 'app/shared/model/org-mi.model';
import { OrgMiService } from './org-mi.service';
import { OrgMiComponent } from './org-mi.component';
import { OrgMiDetailComponent } from './org-mi-detail.component';
import { OrgMiUpdateComponent } from './org-mi-update.component';
import { OrgMiDeletePopupComponent } from './org-mi-delete-dialog.component';
import { IOrgMi } from 'app/shared/model/org-mi.model';

@Injectable({ providedIn: 'root' })
export class OrgMiResolve implements Resolve<IOrgMi> {
    constructor(private service: OrgMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((org: HttpResponse<OrgMi>) => org.body));
        }
        return of(new OrgMi());
    }
}

export const orgRoute: Routes = [
    {
        path: 'org-mi',
        component: OrgMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.org.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'org-mi/:id/view',
        component: OrgMiDetailComponent,
        resolve: {
            org: OrgMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.org.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'org-mi/new',
        component: OrgMiUpdateComponent,
        resolve: {
            org: OrgMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.org.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'org-mi/:id/edit',
        component: OrgMiUpdateComponent,
        resolve: {
            org: OrgMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.org.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orgPopupRoute: Routes = [
    {
        path: 'org-mi/:id/delete',
        component: OrgMiDeletePopupComponent,
        resolve: {
            org: OrgMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.org.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
