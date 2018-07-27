/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { OrgMiDeleteDialogComponent } from 'app/entities/org-mi/org-mi-delete-dialog.component';
import { OrgMiService } from 'app/entities/org-mi/org-mi.service';

describe('Component Tests', () => {
    describe('OrgMi Management Delete Component', () => {
        let comp: OrgMiDeleteDialogComponent;
        let fixture: ComponentFixture<OrgMiDeleteDialogComponent>;
        let service: OrgMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [OrgMiDeleteDialogComponent]
            })
                .overrideTemplate(OrgMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrgMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrgMiService);
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
