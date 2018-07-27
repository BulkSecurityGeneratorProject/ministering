import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberMi } from 'app/shared/model/member-mi.model';
import { MemberMiService } from './member-mi.service';
import { MemberMiComponent } from './member-mi.component';
import { MemberMiDetailComponent } from './member-mi-detail.component';
import { MemberMiUpdateComponent } from './member-mi-update.component';
import { MemberMiDeletePopupComponent } from './member-mi-delete-dialog.component';
import { IMemberMi } from 'app/shared/model/member-mi.model';

@Injectable({ providedIn: 'root' })
export class MemberMiResolve implements Resolve<IMemberMi> {
    constructor(private service: MemberMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((member: HttpResponse<MemberMi>) => member.body));
        }
        return of(new MemberMi());
    }
}

export const memberRoute: Routes = [
    {
        path: 'member-mi',
        component: MemberMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.member.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'member-mi/:id/view',
        component: MemberMiDetailComponent,
        resolve: {
            member: MemberMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.member.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'member-mi/new',
        component: MemberMiUpdateComponent,
        resolve: {
            member: MemberMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.member.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'member-mi/:id/edit',
        component: MemberMiUpdateComponent,
        resolve: {
            member: MemberMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.member.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const memberPopupRoute: Routes = [
    {
        path: 'member-mi/:id/delete',
        component: MemberMiDeletePopupComponent,
        resolve: {
            member: MemberMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.member.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
