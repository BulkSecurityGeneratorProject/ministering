import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanionshipMi } from 'app/shared/model/companionship-mi.model';

type EntityResponseType = HttpResponse<ICompanionshipMi>;
type EntityArrayResponseType = HttpResponse<ICompanionshipMi[]>;

@Injectable({ providedIn: 'root' })
export class CompanionshipMiService {
    private resourceUrl = SERVER_API_URL + 'api/companionships';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/companionships';

    constructor(private http: HttpClient) {}

    create(companionship: ICompanionshipMi): Observable<EntityResponseType> {
        return this.http.post<ICompanionshipMi>(this.resourceUrl, companionship, { observe: 'response' });
    }

    update(companionship: ICompanionshipMi): Observable<EntityResponseType> {
        return this.http.put<ICompanionshipMi>(this.resourceUrl, companionship, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanionshipMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanionshipMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanionshipMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
