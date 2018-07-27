/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { MinistryMiComponent } from 'app/entities/ministry-mi/ministry-mi.component';
import { MinistryMiService } from 'app/entities/ministry-mi/ministry-mi.service';
import { MinistryMi } from 'app/shared/model/ministry-mi.model';

describe('Component Tests', () => {
    describe('MinistryMi Management Component', () => {
        let comp: MinistryMiComponent;
        let fixture: ComponentFixture<MinistryMiComponent>;
        let service: MinistryMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [MinistryMiComponent],
                providers: []
            })
                .overrideTemplate(MinistryMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MinistryMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MinistryMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MinistryMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ministries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
