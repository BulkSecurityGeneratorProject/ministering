import { element, by, promise, ElementFinder } from 'protractor';

export class MemberComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-member-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MemberUpdatePage {
    pageTitle = element(by.id('jhi-member-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeSelect = element(by.id('field_type'));
    firstNameInput = element(by.id('field_firstName'));
    middleNameInput = element(by.id('field_middleName'));
    lastNameInput = element(by.id('field_lastName'));
    birthdateInput = element(by.id('field_birthdate'));
    familySelect = element(by.id('field_family'));
    phoneSelect = element(by.id('field_phone'));
    emailSelect = element(by.id('field_email'));
    socialMediaSelect = element(by.id('field_socialMedia'));
    notesSelect = element(by.id('field_notes'));
    companionSelect = element(by.id('field_companion'));
    ministrySelect = element(by.id('field_ministry'));

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
    setFirstNameInput(firstName): promise.Promise<void> {
        return this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    setMiddleNameInput(middleName): promise.Promise<void> {
        return this.middleNameInput.sendKeys(middleName);
    }

    getMiddleNameInput() {
        return this.middleNameInput.getAttribute('value');
    }

    setLastNameInput(lastName): promise.Promise<void> {
        return this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    setBirthdateInput(birthdate): promise.Promise<void> {
        return this.birthdateInput.sendKeys(birthdate);
    }

    getBirthdateInput() {
        return this.birthdateInput.getAttribute('value');
    }

    familySelectLastOption(): promise.Promise<void> {
        return this.familySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    familySelectOption(option): promise.Promise<void> {
        return this.familySelect.sendKeys(option);
    }

    getFamilySelect(): ElementFinder {
        return this.familySelect;
    }

    getFamilySelectedOption() {
        return this.familySelect.element(by.css('option:checked')).getText();
    }

    phoneSelectLastOption(): promise.Promise<void> {
        return this.phoneSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    phoneSelectOption(option): promise.Promise<void> {
        return this.phoneSelect.sendKeys(option);
    }

    getPhoneSelect(): ElementFinder {
        return this.phoneSelect;
    }

    getPhoneSelectedOption() {
        return this.phoneSelect.element(by.css('option:checked')).getText();
    }

    emailSelectLastOption(): promise.Promise<void> {
        return this.emailSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    emailSelectOption(option): promise.Promise<void> {
        return this.emailSelect.sendKeys(option);
    }

    getEmailSelect(): ElementFinder {
        return this.emailSelect;
    }

    getEmailSelectedOption() {
        return this.emailSelect.element(by.css('option:checked')).getText();
    }

    socialMediaSelectLastOption(): promise.Promise<void> {
        return this.socialMediaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    socialMediaSelectOption(option): promise.Promise<void> {
        return this.socialMediaSelect.sendKeys(option);
    }

    getSocialMediaSelect(): ElementFinder {
        return this.socialMediaSelect;
    }

    getSocialMediaSelectedOption() {
        return this.socialMediaSelect.element(by.css('option:checked')).getText();
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
