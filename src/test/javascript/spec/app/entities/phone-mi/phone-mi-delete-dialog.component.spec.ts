/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { PhoneMiDeleteDialogComponent } from 'app/entities/phone-mi/phone-mi-delete-dialog.component';
import { PhoneMiService } from 'app/entities/phone-mi/phone-mi.service';

describe('Component Tests', () => {
    describe('PhoneMi Management Delete Component', () => {
        let comp: PhoneMiDeleteDialogComponent;
        let fixture: ComponentFixture<PhoneMiDeleteDialogComponent>;
        let service: PhoneMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [PhoneMiDeleteDialogComponent]
            })
                .overrideTemplate(PhoneMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PhoneMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneMiService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
