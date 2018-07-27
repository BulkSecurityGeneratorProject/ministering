import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhoneMi } from 'app/shared/model/phone-mi.model';
import { PhoneMiService } from './phone-mi.service';
import { PhoneMiComponent } from './phone-mi.component';
import { PhoneMiDetailComponent } from './phone-mi-detail.component';
import { PhoneMiUpdateComponent } from './phone-mi-update.component';
import { PhoneMiDeletePopupComponent } from './phone-mi-delete-dialog.component';
import { IPhoneMi } from 'app/shared/model/phone-mi.model';

@Injectable({ providedIn: 'root' })
export class PhoneMiResolve implements Resolve<IPhoneMi> {
    constructor(private service: PhoneMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((phone: HttpResponse<PhoneMi>) => phone.body));
        }
        return of(new PhoneMi());
    }
}

export const phoneRoute: Routes = [
    {
        path: 'phone-mi',
        component: PhoneMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phone-mi/:id/view',
        component: PhoneMiDetailComponent,
        resolve: {
            phone: PhoneMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phone-mi/new',
        component: PhoneMiUpdateComponent,
        resolve: {
            phone: PhoneMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phone-mi/:id/edit',
        component: PhoneMiUpdateComponent,
        resolve: {
            phone: PhoneMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phonePopupRoute: Routes = [
    {
        path: 'phone-mi/:id/delete',
        component: PhoneMiDeletePopupComponent,
        resolve: {
            phone: PhoneMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
