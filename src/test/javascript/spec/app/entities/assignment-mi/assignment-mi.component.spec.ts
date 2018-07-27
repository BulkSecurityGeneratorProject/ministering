/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { AssignmentMiComponent } from 'app/entities/assignment-mi/assignment-mi.component';
import { AssignmentMiService } from 'app/entities/assignment-mi/assignment-mi.service';
import { AssignmentMi } from 'app/shared/model/assignment-mi.model';

describe('Component Tests', () => {
    describe('AssignmentMi Management Component', () => {
        let comp: AssignmentMiComponent;
        let fixture: ComponentFixture<AssignmentMiComponent>;
        let service: AssignmentMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [AssignmentMiComponent],
                providers: []
            })
                .overrideTemplate(AssignmentMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AssignmentMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AssignmentMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.assignments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
