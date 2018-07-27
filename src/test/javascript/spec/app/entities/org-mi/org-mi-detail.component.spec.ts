/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { OrgMiDetailComponent } from 'app/entities/org-mi/org-mi-detail.component';
import { OrgMi } from 'app/shared/model/org-mi.model';

describe('Component Tests', () => {
    describe('OrgMi Management Detail Component', () => {
        let comp: OrgMiDetailComponent;
        let fixture: ComponentFixture<OrgMiDetailComponent>;
        const route = ({ data: of({ org: new OrgMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [OrgMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrgMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrgMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.org).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
