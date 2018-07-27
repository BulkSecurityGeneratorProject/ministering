import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FamilyMi } from 'app/shared/model/family-mi.model';
import { FamilyMiService } from './family-mi.service';
import { FamilyMiComponent } from './family-mi.component';
import { FamilyMiDetailComponent } from './family-mi-detail.component';
import { FamilyMiUpdateComponent } from './family-mi-update.component';
import { FamilyMiDeletePopupComponent } from './family-mi-delete-dialog.component';
import { IFamilyMi } from 'app/shared/model/family-mi.model';

@Injectable({ providedIn: 'root' })
export class FamilyMiResolve implements Resolve<IFamilyMi> {
    constructor(private service: FamilyMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((family: HttpResponse<FamilyMi>) => family.body));
        }
        return of(new FamilyMi());
    }
}

export const familyRoute: Routes = [
    {
        path: 'family-mi',
        component: FamilyMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'family-mi/:id/view',
        component: FamilyMiDetailComponent,
        resolve: {
            family: FamilyMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'family-mi/new',
        component: FamilyMiUpdateComponent,
        resolve: {
            family: FamilyMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'family-mi/:id/edit',
        component: FamilyMiUpdateComponent,
        resolve: {
            family: FamilyMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const familyPopupRoute: Routes = [
    {
        path: 'family-mi/:id/delete',
        component: FamilyMiDeletePopupComponent,
        resolve: {
            family: FamilyMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
