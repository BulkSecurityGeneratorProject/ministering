/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { AssignmentMiDetailComponent } from 'app/entities/assignment-mi/assignment-mi-detail.component';
import { AssignmentMi } from 'app/shared/model/assignment-mi.model';

describe('Component Tests', () => {
    describe('AssignmentMi Management Detail Component', () => {
        let comp: AssignmentMiDetailComponent;
        let fixture: ComponentFixture<AssignmentMiDetailComponent>;
        const route = ({ data: of({ assignment: new AssignmentMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [AssignmentMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AssignmentMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AssignmentMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.assignment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
