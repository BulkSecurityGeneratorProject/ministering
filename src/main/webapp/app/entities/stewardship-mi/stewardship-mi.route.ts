import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StewardshipMi } from 'app/shared/model/stewardship-mi.model';
import { StewardshipMiService } from './stewardship-mi.service';
import { StewardshipMiComponent } from './stewardship-mi.component';
import { StewardshipMiDetailComponent } from './stewardship-mi-detail.component';
import { StewardshipMiUpdateComponent } from './stewardship-mi-update.component';
import { StewardshipMiDeletePopupComponent } from './stewardship-mi-delete-dialog.component';
import { IStewardshipMi } from 'app/shared/model/stewardship-mi.model';

@Injectable({ providedIn: 'root' })
export class StewardshipMiResolve implements Resolve<IStewardshipMi> {
    constructor(private service: StewardshipMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((stewardship: HttpResponse<StewardshipMi>) => stewardship.body));
        }
        return of(new StewardshipMi());
    }
}

export const stewardshipRoute: Routes = [
    {
        path: 'stewardship-mi',
        component: StewardshipMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.stewardship.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stewardship-mi/:id/view',
        component: StewardshipMiDetailComponent,
        resolve: {
            stewardship: StewardshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.stewardship.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stewardship-mi/new',
        component: StewardshipMiUpdateComponent,
        resolve: {
            stewardship: StewardshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.stewardship.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stewardship-mi/:id/edit',
        component: StewardshipMiUpdateComponent,
        resolve: {
            stewardship: StewardshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.stewardship.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stewardshipPopupRoute: Routes = [
    {
        path: 'stewardship-mi/:id/delete',
        component: StewardshipMiDeletePopupComponent,
        resolve: {
            stewardship: StewardshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.stewardship.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
