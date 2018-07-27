/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { EmailMiDetailComponent } from 'app/entities/email-mi/email-mi-detail.component';
import { EmailMi } from 'app/shared/model/email-mi.model';

describe('Component Tests', () => {
    describe('EmailMi Management Detail Component', () => {
        let comp: EmailMiDetailComponent;
        let fixture: ComponentFixture<EmailMiDetailComponent>;
        const route = ({ data: of({ email: new EmailMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [EmailMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmailMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmailMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.email).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
