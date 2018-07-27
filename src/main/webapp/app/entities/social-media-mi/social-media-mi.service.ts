import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISocialMediaMi } from 'app/shared/model/social-media-mi.model';

type EntityResponseType = HttpResponse<ISocialMediaMi>;
type EntityArrayResponseType = HttpResponse<ISocialMediaMi[]>;

@Injectable({ providedIn: 'root' })
export class SocialMediaMiService {
    private resourceUrl = SERVER_API_URL + 'api/social-medias';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/social-medias';

    constructor(private http: HttpClient) {}

    create(socialMedia: ISocialMediaMi): Observable<EntityResponseType> {
        return this.http.post<ISocialMediaMi>(this.resourceUrl, socialMedia, { observe: 'response' });
    }

    update(socialMedia: ISocialMediaMi): Observable<EntityResponseType> {
        return this.http.put<ISocialMediaMi>(this.resourceUrl, socialMedia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISocialMediaMi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISocialMediaMi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISocialMediaMi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
