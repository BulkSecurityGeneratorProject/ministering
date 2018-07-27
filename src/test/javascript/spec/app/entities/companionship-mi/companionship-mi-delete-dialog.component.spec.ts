/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { CompanionshipMiDeleteDialogComponent } from 'app/entities/companionship-mi/companionship-mi-delete-dialog.component';
import { CompanionshipMiService } from 'app/entities/companionship-mi/companionship-mi.service';

describe('Component Tests', () => {
    describe('CompanionshipMi Management Delete Component', () => {
        let comp: CompanionshipMiDeleteDialogComponent;
        let fixture: ComponentFixture<CompanionshipMiDeleteDialogComponent>;
        let service: CompanionshipMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [CompanionshipMiDeleteDialogComponent]
            })
                .overrideTemplate(CompanionshipMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanionshipMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanionshipMiService);
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
