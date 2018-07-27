/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { OrgMiComponent } from 'app/entities/org-mi/org-mi.component';
import { OrgMiService } from 'app/entities/org-mi/org-mi.service';
import { OrgMi } from 'app/shared/model/org-mi.model';

describe('Component Tests', () => {
    describe('OrgMi Management Component', () => {
        let comp: OrgMiComponent;
        let fixture: ComponentFixture<OrgMiComponent>;
        let service: OrgMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [OrgMiComponent],
                providers: []
            })
                .overrideTemplate(OrgMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrgMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrgMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrgMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orgs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
