/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { MinistryMiDetailComponent } from 'app/entities/ministry-mi/ministry-mi-detail.component';
import { MinistryMi } from 'app/shared/model/ministry-mi.model';

describe('Component Tests', () => {
    describe('MinistryMi Management Detail Component', () => {
        let comp: MinistryMiDetailComponent;
        let fixture: ComponentFixture<MinistryMiDetailComponent>;
        const route = ({ data: of({ ministry: new MinistryMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [MinistryMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MinistryMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MinistryMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ministry).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
