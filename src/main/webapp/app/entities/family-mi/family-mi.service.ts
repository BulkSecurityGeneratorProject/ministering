import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFamilyMi } from 'app/shared/model/family-mi.model';

type EntityResponseType = HttpResponse<IFamilyMi>;
type EntityArrayResponseType = HttpResponse<IFamilyMi[]>;

@Injectable({ providedIn: 'root' })
export class FamilyMiService {
    private resourceUrl = SERVER_API_URL + 'api/families';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/families';

    constructor(private http: HttpClient) {}

    create(family: IFamilyMi): Observable<EntityResponseType> {
        return this.http.post<IFamilyMi>(this.resourceUrl, family, { observe: 'response' });
    }

    update(family: IFamilyMi): Observable<EntityResponseType> {
        return this.http.put<IFamilyMi>(this.resourceUrl, family, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFamilyMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFamilyMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFamilyMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
