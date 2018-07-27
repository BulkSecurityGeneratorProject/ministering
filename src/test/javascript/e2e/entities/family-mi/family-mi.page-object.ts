import { element, by, promise, ElementFinder } from 'protractor';

export class FamilyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-family-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FamilyUpdatePage {
    pageTitle = element(by.id('jhi-family-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    coupleNameInput = element(by.id('field_coupleName'));
    addressInput = element(by.id('field_address'));
    notesSelect = element(by.id('field_notes'));
    assignmentSelect = element(by.id('field_assignment'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setCoupleNameInput(coupleName): promise.Promise<void> {
        return this.coupleNameInput.sendKeys(coupleName);
    }

    getCoupleNameInput() {
        return this.coupleNameInput.getAttribute('value');
    }

    setAddressInput(address): promise.Promise<void> {
        return this.addressInput.sendKeys(address);
    }

    getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    notesSelectLastOption(): promise.Promise<void> {
        return this.notesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    notesSelectOption(option): promise.Promise<void> {
        return this.notesSelect.sendKeys(option);
    }

    getNotesSelect(): ElementFinder {
        return this.notesSelect;
    }

    getNotesSelectedOption() {
        return this.notesSelect.element(by.css('option:checked')).getText();
    }

    assignmentSelectLastOption(): promise.Promise<void> {
        return this.assignmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    assignmentSelectOption(option): promise.Promise<void> {
        return this.assignmentSelect.sendKeys(option);
    }

    getAssignmentSelect(): ElementFinder {
        return this.assignmentSelect;
    }

    getAssignmentSelectedOption() {
        return this.assignmentSelect.element(by.css('option:checked')).getText();
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
