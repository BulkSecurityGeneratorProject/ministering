import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';

type EntityResponseType = HttpResponse<IAssignmentMi>;
type EntityArrayResponseType = HttpResponse<IAssignmentMi[]>;

@Injectable({ providedIn: 'root' })
export class AssignmentMiService {
    private resourceUrl = SERVER_API_URL + 'api/assignments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/assignments';

    constructor(private http: HttpClient) {}

    create(assignment: IAssignmentMi): Observable<EntityResponseType> {
        return this.http.post<IAssignmentMi>(this.resourceUrl, assignment, { observe: 'response' });
    }

    update(assignment: IAssignmentMi): Observable<EntityResponseType> {
        return this.http.put<IAssignmentMi>(this.resourceUrl, assignment, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAssignmentMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAssignmentMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAssignmentMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
