import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MinistryMi } from 'app/shared/model/ministry-mi.model';
import { MinistryMiService } from './ministry-mi.service';
import { MinistryMiComponent } from './ministry-mi.component';
import { MinistryMiDetailComponent } from './ministry-mi-detail.component';
import { MinistryMiUpdateComponent } from './ministry-mi-update.component';
import { MinistryMiDeletePopupComponent } from './ministry-mi-delete-dialog.component';
import { IMinistryMi } from 'app/shared/model/ministry-mi.model';

@Injectable({ providedIn: 'root' })
export class MinistryMiResolve implements Resolve<IMinistryMi> {
    constructor(private service: MinistryMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ministry: HttpResponse<MinistryMi>) => ministry.body));
        }
        return of(new MinistryMi());
    }
}

export const ministryRoute: Routes = [
    {
        path: 'ministry-mi',
        component: MinistryMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.ministry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ministry-mi/:id/view',
        component: MinistryMiDetailComponent,
        resolve: {
            ministry: MinistryMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.ministry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ministry-mi/new',
        component: MinistryMiUpdateComponent,
        resolve: {
            ministry: MinistryMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.ministry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ministry-mi/:id/edit',
        component: MinistryMiUpdateComponent,
        resolve: {
            ministry: MinistryMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.ministry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ministryPopupRoute: Routes = [
    {
        path: 'ministry-mi/:id/delete',
        component: MinistryMiDeletePopupComponent,
        resolve: {
            ministry: MinistryMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.ministry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
