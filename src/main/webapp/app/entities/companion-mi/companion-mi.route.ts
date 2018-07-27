import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanionMi } from 'app/shared/model/companion-mi.model';
import { CompanionMiService } from './companion-mi.service';
import { CompanionMiComponent } from './companion-mi.component';
import { CompanionMiDetailComponent } from './companion-mi-detail.component';
import { CompanionMiUpdateComponent } from './companion-mi-update.component';
import { CompanionMiDeletePopupComponent } from './companion-mi-delete-dialog.component';
import { ICompanionMi } from 'app/shared/model/companion-mi.model';

@Injectable({ providedIn: 'root' })
export class CompanionMiResolve implements Resolve<ICompanionMi> {
    constructor(private service: CompanionMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((companion: HttpResponse<CompanionMi>) => companion.body));
        }
        return of(new CompanionMi());
    }
}

export const companionRoute: Routes = [
    {
        path: 'companion-mi',
        component: CompanionMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companion-mi/:id/view',
        component: CompanionMiDetailComponent,
        resolve: {
            companion: CompanionMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companion-mi/new',
        component: CompanionMiUpdateComponent,
        resolve: {
            companion: CompanionMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companion-mi/:id/edit',
        component: CompanionMiUpdateComponent,
        resolve: {
            companion: CompanionMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companionPopupRoute: Routes = [
    {
        path: 'companion-mi/:id/delete',
        component: CompanionMiDeletePopupComponent,
        resolve: {
            companion: CompanionMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
