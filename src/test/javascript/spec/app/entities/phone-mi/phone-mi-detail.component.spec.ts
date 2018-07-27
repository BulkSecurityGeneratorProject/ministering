/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { PhoneMiDetailComponent } from 'app/entities/phone-mi/phone-mi-detail.component';
import { PhoneMi } from 'app/shared/model/phone-mi.model';

describe('Component Tests', () => {
    describe('PhoneMi Management Detail Component', () => {
        let comp: PhoneMiDetailComponent;
        let fixture: ComponentFixture<PhoneMiDetailComponent>;
        const route = ({ data: of({ phone: new PhoneMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [PhoneMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PhoneMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PhoneMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.phone).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
