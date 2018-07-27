/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { CompanionMiDeleteDialogComponent } from 'app/entities/companion-mi/companion-mi-delete-dialog.component';
import { CompanionMiService } from 'app/entities/companion-mi/companion-mi.service';

describe('Component Tests', () => {
    describe('CompanionMi Management Delete Component', () => {
        let comp: CompanionMiDeleteDialogComponent;
        let fixture: ComponentFixture<CompanionMiDeleteDialogComponent>;
        let service: CompanionMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [CompanionMiDeleteDialogComponent]
            })
                .overrideTemplate(CompanionMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanionMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanionMiService);
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
