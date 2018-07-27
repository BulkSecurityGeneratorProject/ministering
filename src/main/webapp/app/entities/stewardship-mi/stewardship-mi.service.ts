import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStewardshipMi } from 'app/shared/model/stewardship-mi.model';

type EntityResponseType = HttpResponse<IStewardshipMi>;
type EntityArrayResponseType = HttpResponse<IStewardshipMi[]>;

@Injectable({ providedIn: 'root' })
export class StewardshipMiService {
    private resourceUrl = SERVER_API_URL + 'api/stewardships';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stewardships';

    constructor(private http: HttpClient) {}

    create(stewardship: IStewardshipMi): Observable<EntityResponseType> {
        return this.http.post<IStewardshipMi>(this.resourceUrl, stewardship, { observe: 'response' });
    }

    update(stewardship: IStewardshipMi): Observable<EntityResponseType> {
        return this.http.put<IStewardshipMi>(this.resourceUrl, stewardship, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStewardshipMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStewardshipMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStewardshipMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
