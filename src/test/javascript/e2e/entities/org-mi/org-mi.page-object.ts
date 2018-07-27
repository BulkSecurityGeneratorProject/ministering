import { element, by, promise, ElementFinder } from 'protractor';

export class OrgComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-org-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrgUpdatePage {
    pageTitle = element(by.id('jhi-org-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    memberSelect = element(by.id('field_member'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    memberSelectLastOption(): promise.Promise<void> {
        return this.memberSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    memberSelectOption(option): promise.Promise<void> {
        return this.memberSelect.sendKeys(option);
    }

    getMemberSelect(): ElementFinder {
        return this.memberSelect;
    }

    getMemberSelectedOption() {
        return this.memberSelect.element(by.css('option:checked')).getText();
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
