import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanionshipMi } from 'app/shared/model/companionship-mi.model';
import { CompanionshipMiService } from './companionship-mi.service';
import { CompanionshipMiComponent } from './companionship-mi.component';
import { CompanionshipMiDetailComponent } from './companionship-mi-detail.component';
import { CompanionshipMiUpdateComponent } from './companionship-mi-update.component';
import { CompanionshipMiDeletePopupComponent } from './companionship-mi-delete-dialog.component';
import { ICompanionshipMi } from 'app/shared/model/companionship-mi.model';

@Injectable({ providedIn: 'root' })
export class CompanionshipMiResolve implements Resolve<ICompanionshipMi> {
    constructor(private service: CompanionshipMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((companionship: HttpResponse<CompanionshipMi>) => companionship.body));
        }
        return of(new CompanionshipMi());
    }
}

export const companionshipRoute: Routes = [
    {
        path: 'companionship-mi',
        component: CompanionshipMiComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'ministeringApp.companionship.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companionship-mi/:id/view',
        component: CompanionshipMiDetailComponent,
        resolve: {
            companionship: CompanionshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companionship.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companionship-mi/new',
        component: CompanionshipMiUpdateComponent,
        resolve: {
            companionship: CompanionshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companionship.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companionship-mi/:id/edit',
        component: CompanionshipMiUpdateComponent,
        resolve: {
            companionship: CompanionshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companionship.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companionshipPopupRoute: Routes = [
    {
        path: 'companionship-mi/:id/delete',
        component: CompanionshipMiDeletePopupComponent,
        resolve: {
            companionship: CompanionshipMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.companionship.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
