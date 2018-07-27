/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { EmailMiComponent } from 'app/entities/email-mi/email-mi.component';
import { EmailMiService } from 'app/entities/email-mi/email-mi.service';
import { EmailMi } from 'app/shared/model/email-mi.model';

describe('Component Tests', () => {
    describe('EmailMi Management Component', () => {
        let comp: EmailMiComponent;
        let fixture: ComponentFixture<EmailMiComponent>;
        let service: EmailMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [EmailMiComponent],
                providers: []
            })
                .overrideTemplate(EmailMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmailMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EmailMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.emails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
