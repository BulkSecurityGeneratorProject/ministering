import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMinistryMi } from 'app/shared/model/ministry-mi.model';

type EntityResponseType = HttpResponse<IMinistryMi>;
type EntityArrayResponseType = HttpResponse<IMinistryMi[]>;

@Injectable({ providedIn: 'root' })
export class MinistryMiService {
    private resourceUrl = SERVER_API_URL + 'api/ministries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/ministries';

    constructor(private http: HttpClient) {}

    create(ministry: IMinistryMi): Observable<EntityResponseType> {
        return this.http.post<IMinistryMi>(this.resourceUrl, ministry, { observe: 'response' });
    }

    update(ministry: IMinistryMi): Observable<EntityResponseType> {
        return this.http.put<IMinistryMi>(this.resourceUrl, ministry, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMinistryMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMinistryMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMinistryMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
