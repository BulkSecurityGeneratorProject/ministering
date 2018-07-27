import { element, by, promise, ElementFinder } from 'protractor';

export class CompanionshipComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-companionship-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CompanionshipUpdatePage {
    pageTitle = element(by.id('jhi-companionship-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    companionshipSelect = element(by.id('field_companionship'));
    notesSelect = element(by.id('field_notes'));
    stewardshipSelect = element(by.id('field_stewardship'));
    companionSelect = element(by.id('field_companion'));
    ministrySelect = element(by.id('field_ministry'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    companionshipSelectLastOption(): promise.Promise<void> {
        return this.companionshipSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    companionshipSelectOption(option): promise.Promise<void> {
        return this.companionshipSelect.sendKeys(option);
    }

    getCompanionshipSelect(): ElementFinder {
        return this.companionshipSelect;
    }

    getCompanionshipSelectedOption() {
        return this.companionshipSelect.element(by.css('option:checked')).getText();
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

    stewardshipSelectLastOption(): promise.Promise<void> {
        return this.stewardshipSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    stewardshipSelectOption(option): promise.Promise<void> {
        return this.stewardshipSelect.sendKeys(option);
    }

    getStewardshipSelect(): ElementFinder {
        return this.stewardshipSelect;
    }

    getStewardshipSelectedOption() {
        return this.stewardshipSelect.element(by.css('option:checked')).getText();
    }

    companionSelectLastOption(): promise.Promise<void> {
        return this.companionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    companionSelectOption(option): promise.Promise<void> {
        return this.companionSelect.sendKeys(option);
    }

    getCompanionSelect(): ElementFinder {
        return this.companionSelect;
    }

    getCompanionSelectedOption() {
        return this.companionSelect.element(by.css('option:checked')).getText();
    }

    ministrySelectLastOption(): promise.Promise<void> {
        return this.ministrySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    ministrySelectOption(option): promise.Promise<void> {
        return this.ministrySelect.sendKeys(option);
    }

    getMinistrySelect(): ElementFinder {
        return this.ministrySelect;
    }

    getMinistrySelectedOption() {
        return this.ministrySelect.element(by.css('option:checked')).getText();
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
