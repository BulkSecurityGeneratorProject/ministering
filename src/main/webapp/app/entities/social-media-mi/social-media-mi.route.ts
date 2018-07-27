import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocialMediaMi } from 'app/shared/model/social-media-mi.model';
import { SocialMediaMiService } from './social-media-mi.service';
import { SocialMediaMiComponent } from './social-media-mi.component';
import { SocialMediaMiDetailComponent } from './social-media-mi-detail.component';
import { SocialMediaMiUpdateComponent } from './social-media-mi-update.component';
import { SocialMediaMiDeletePopupComponent } from './social-media-mi-delete-dialog.component';
import { ISocialMediaMi } from 'app/shared/model/social-media-mi.model';

@Injectable({ providedIn: 'root' })
export class SocialMediaMiResolve implements Resolve<ISocialMediaMi> {
    constructor(private service: SocialMediaMiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((socialMedia: HttpResponse<SocialMediaMi>) => socialMedia.body));
        }
        return of(new SocialMediaMi());
    }
}

export const socialMediaRoute: Routes = [
    {
        path: 'social-media-mi',
        component: SocialMediaMiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.socialMedia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'social-media-mi/:id/view',
        component: SocialMediaMiDetailComponent,
        resolve: {
            socialMedia: SocialMediaMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.socialMedia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'social-media-mi/new',
        component: SocialMediaMiUpdateComponent,
        resolve: {
            socialMedia: SocialMediaMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.socialMedia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'social-media-mi/:id/edit',
        component: SocialMediaMiUpdateComponent,
        resolve: {
            socialMedia: SocialMediaMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.socialMedia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const socialMediaPopupRoute: Routes = [
    {
        path: 'social-media-mi/:id/delete',
        component: SocialMediaMiDeletePopupComponent,
        resolve: {
            socialMedia: SocialMediaMiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ministeringApp.socialMedia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
