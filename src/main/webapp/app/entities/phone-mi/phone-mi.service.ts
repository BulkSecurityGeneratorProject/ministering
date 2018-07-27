import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPhoneMi } from 'app/shared/model/phone-mi.model';

type EntityResponseType = HttpResponse<IPhoneMi>;
type EntityArrayResponseType = HttpResponse<IPhoneMi[]>;

@Injectable({ providedIn: 'root' })
export class PhoneMiService {
    private resourceUrl = SERVER_API_URL + 'api/phones';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/phones';

    constructor(private http: HttpClient) {}

    create(phone: IPhoneMi): Observable<EntityResponseType> {
        return this.http.post<IPhoneMi>(this.resourceUrl, phone, { observe: 'response' });
    }

    update(phone: IPhoneMi): Observable<EntityResponseType> {
        return this.http.put<IPhoneMi>(this.resourceUrl, phone, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPhoneMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhoneMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhoneMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
