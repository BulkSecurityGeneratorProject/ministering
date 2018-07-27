import { element, by, promise, ElementFinder } from 'protractor';

export class NotesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-notes-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NotesUpdatePage {
    pageTitle = element(by.id('jhi-notes-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeSelect = element(by.id('field_type'));
    noteInput = element(by.id('field_note'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTypeSelect(type): promise.Promise<void> {
        return this.typeSelect.sendKeys(type);
    }

    getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    typeSelectLastOption(): promise.Promise<void> {
        return this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setNoteInput(note): promise.Promise<void> {
        return this.noteInput.sendKeys(note);
    }

    getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
