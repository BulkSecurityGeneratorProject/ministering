/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { PhoneMiComponent } from 'app/entities/phone-mi/phone-mi.component';
import { PhoneMiService } from 'app/entities/phone-mi/phone-mi.service';
import { PhoneMi } from 'app/shared/model/phone-mi.model';

describe('Component Tests', () => {
    describe('PhoneMi Management Component', () => {
        let comp: PhoneMiComponent;
        let fixture: ComponentFixture<PhoneMiComponent>;
        let service: PhoneMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [PhoneMiComponent],
                providers: []
            })
                .overrideTemplate(PhoneMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhoneMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PhoneMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.phones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
