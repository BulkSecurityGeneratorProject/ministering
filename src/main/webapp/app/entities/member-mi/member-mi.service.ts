import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMemberMi } from 'app/shared/model/member-mi.model';

type EntityResponseType = HttpResponse<IMemberMi>;
type EntityArrayResponseType = HttpResponse<IMemberMi[]>;

@Injectable({ providedIn: 'root' })
export class MemberMiService {
    private resourceUrl = SERVER_API_URL + 'api/members';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/members';

    constructor(private http: HttpClient) {}

    create(member: IMemberMi): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(member);
        return this.http
            .post<IMemberMi>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(member: IMemberMi): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(member);
        return this.http
            .put<IMemberMi>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMemberMi>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMemberMi[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMemberMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(member: IMemberMi): IMemberMi {
        const copy: IMemberMi = Object.assign({}, member, {
            birthdate: member.birthdate != null && member.birthdate.isValid() ? member.birthdate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.birthdate = res.body.birthdate != null ? moment(res.body.birthdate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((member: IMemberMi) => {
            member.birthdate = member.birthdate != null ? moment(member.birthdate) : null;
        });
        return res;
    }
}
