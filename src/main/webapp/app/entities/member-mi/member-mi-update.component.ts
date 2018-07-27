import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IMemberMi } from 'app/shared/model/member-mi.model';
import { MemberMiService } from './member-mi.service';
import { IFamilyMi } from 'app/shared/model/family-mi.model';
import { FamilyMiService } from 'app/entities/family-mi';
import { IPhoneMi } from 'app/shared/model/phone-mi.model';
import { PhoneMiService } from 'app/entities/phone-mi';
import { IEmailMi } from 'app/shared/model/email-mi.model';
import { EmailMiService } from 'app/entities/email-mi';
import { ISocialMediaMi } from 'app/shared/model/social-media-mi.model';
import { SocialMediaMiService } from 'app/entities/social-media-mi';
import { INotesMi } from 'app/shared/model/notes-mi.model';
import { NotesMiService } from 'app/entities/notes-mi';
import { ICompanionMi } from 'app/shared/model/companion-mi.model';
import { CompanionMiService } from 'app/entities/companion-mi';
import { IMinistryMi } from 'app/shared/model/ministry-mi.model';
import { MinistryMiService } from 'app/entities/ministry-mi';

@Component({
    selector: 'jhi-member-mi-update',
    templateUrl: './member-mi-update.component.html'
})
export class MemberMiUpdateComponent implements OnInit {
    private _member: IMemberMi;
    isSaving: boolean;

    families: IFamilyMi[];

    phones: IPhoneMi[];

    emails: IEmailMi[];

    socialmedias: ISocialMediaMi[];

    notes: INotesMi[];

    companions: ICompanionMi[];

    ministries: IMinistryMi[];
    birthdate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private memberService: MemberMiService,
        private familyService: FamilyMiService,
        private phoneService: PhoneMiService,
        private emailService: EmailMiService,
        private socialMediaService: SocialMediaMiService,
        private notesService: NotesMiService,
        private companionService: CompanionMiService,
        private ministryService: MinistryMiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ member }) => {
            this.member = member;
        });
        this.familyService.query().subscribe(
            (res: HttpResponse<IFamilyMi[]>) => {
                this.families = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.phoneService.query().subscribe(
            (res: HttpResponse<IPhoneMi[]>) => {
                this.phones = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.emailService.query().subscribe(
            (res: HttpResponse<IEmailMi[]>) => {
                this.emails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.socialMediaService.query().subscribe(
            (res: HttpResponse<ISocialMediaMi[]>) => {
                this.socialmedias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.notesService.query().subscribe(
            (res: HttpResponse<INotesMi[]>) => {
                this.notes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companionService.query().subscribe(
            (res: HttpResponse<ICompanionMi[]>) => {
                this.companions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ministryService.query().subscribe(
            (res: HttpResponse<IMinistryMi[]>) => {
                this.ministries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.member.birthdate = moment(this.birthdate, DATE_TIME_FORMAT);
        if (this.member.id !== undefined) {
            this.subscribeToSaveResponse(this.memberService.update(this.member));
        } else {
            this.subscribeToSaveResponse(this.memberService.create(this.member));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMemberMi>>) {
        result.subscribe((res: HttpResponse<IMemberMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFamilyById(index: number, item: IFamilyMi) {
        return item.id;
    }

    trackPhoneById(index: number, item: IPhoneMi) {
        return item.id;
    }

    trackEmailById(index: number, item: IEmailMi) {
        return item.id;
    }

    trackSocialMediaById(index: number, item: ISocialMediaMi) {
        return item.id;
    }

    trackNotesById(index: number, item: INotesMi) {
        return item.id;
    }

    trackCompanionById(index: number, item: ICompanionMi) {
        return item.id;
    }

    trackMinistryById(index: number, item: IMinistryMi) {
        return item.id;
    }
    get member() {
        return this._member;
    }

    set member(member: IMemberMi) {
        this._member = member;
        this.birthdate = moment(member.birthdate).format(DATE_TIME_FORMAT);
    }
}
