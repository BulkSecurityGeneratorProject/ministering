/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { FamilyMiDetailComponent } from 'app/entities/family-mi/family-mi-detail.component';
import { FamilyMi } from 'app/shared/model/family-mi.model';

describe('Component Tests', () => {
    describe('FamilyMi Management Detail Component', () => {
        let comp: FamilyMiDetailComponent;
        let fixture: ComponentFixture<FamilyMiDetailComponent>;
        const route = ({ data: of({ family: new FamilyMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [FamilyMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FamilyMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FamilyMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.family).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
