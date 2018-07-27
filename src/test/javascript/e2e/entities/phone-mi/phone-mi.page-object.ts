import { element, by, promise, ElementFinder } from 'protractor';

export class PhoneComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-phone-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PhoneUpdatePage {
    pageTitle = element(by.id('jhi-phone-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeSelect = element(by.id('field_type'));
    numberInput = element(by.id('field_number'));
    textMsgOkayInput = element(by.id('field_textMsgOkay'));

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
    setNumberInput(number): promise.Promise<void> {
        return this.numberInput.sendKeys(number);
    }

    getNumberInput() {
        return this.numberInput.getAttribute('value');
    }

    getTextMsgOkayInput() {
        return this.textMsgOkayInput;
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
