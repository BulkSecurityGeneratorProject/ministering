/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { CompanionMiComponent } from 'app/entities/companion-mi/companion-mi.component';
import { CompanionMiService } from 'app/entities/companion-mi/companion-mi.service';
import { CompanionMi } from 'app/shared/model/companion-mi.model';

describe('Component Tests', () => {
    describe('CompanionMi Management Component', () => {
        let comp: CompanionMiComponent;
        let fixture: ComponentFixture<CompanionMiComponent>;
        let service: CompanionMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [CompanionMiComponent],
                providers: []
            })
                .overrideTemplate(CompanionMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanionMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanionMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanionMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
