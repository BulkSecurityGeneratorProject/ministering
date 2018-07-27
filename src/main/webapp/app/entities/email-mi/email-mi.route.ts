import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailMi } from 'app/shared/model/email-mi.model';
import { EmailMiService } from './email-mi.service';
import { EmailMiComponent } from './email-mi.component';
import { EmailMiDetailComponent } from './email-mi-detail.component';
import { EmailMiUpdateComponent } from './email-mi-update.component';
import { EmailMiDeletePopupComponent } from './email-mi-delete-dialog.component';
import { IEmailMi } from 'app/shared/model/email-mi.model';

@Injectable({ providedIn: 'root' })
export class EmailMiResolve implements Resolve<IEmailMi> {
    constructor(private service: EmailMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((email: HttpResponse<EmailMi>) => email.body));
        }
        return of(new EmailMi());
    }
}

export const emailRoute: Routes = [
    {
        path: 'email-mi',
        component: EmailMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.email.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'email-mi/:id/view',
        component: EmailMiDetailComponent,
        resolve: {
            email: EmailMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.email.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'email-mi/new',
        component: EmailMiUpdateComponent,
        resolve: {
            email: EmailMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.email.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'email-mi/:id/edit',
        component: EmailMiUpdateComponent,
        resolve: {
            email: EmailMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.email.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emailPopupRoute: Routes = [
    {
        path: 'email-mi/:id/delete',
        component: EmailMiDeletePopupComponent,
        resolve: {
            email: EmailMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.email.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
