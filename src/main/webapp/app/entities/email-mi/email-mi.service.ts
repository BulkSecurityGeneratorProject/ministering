import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmailMi } from 'app/shared/model/email-mi.model';

type EntityResponseType = HttpResponse<IEmailMi>;
type EntityArrayResponseType = HttpResponse<IEmailMi[]>;

@Injectable({ providedIn: 'root' })
export class EmailMiService {
    private resourceUrl = SERVER_API_URL + 'api/emails';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/emails';

    constructor(private http: HttpClient) {}

    create(email: IEmailMi): Observable<EntityResponseType> {
        return this.http.post<IEmailMi>(this.resourceUrl, email, { observe: 'response' });
    }

    update(email: IEmailMi): Observable<EntityResponseType> {
        return this.http.put<IEmailMi>(this.resourceUrl, email, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmailMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmailMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmailMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
