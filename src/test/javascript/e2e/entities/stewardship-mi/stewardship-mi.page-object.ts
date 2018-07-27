import { element, by, promise, ElementFinder } from 'protractor';

export class StewardshipComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-stewardship-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StewardshipUpdatePage {
    pageTitle = element(by.id('jhi-stewardship-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    assignmentSelect = element(by.id('field_assignment'));
    ministrySelect = element(by.id('field_ministry'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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
