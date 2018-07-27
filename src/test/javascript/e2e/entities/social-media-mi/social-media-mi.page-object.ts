import { element, by, promise, ElementFinder } from 'protractor';

export class SocialMediaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-social-media-mi div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SocialMediaUpdatePage {
    pageTitle = element(by.id('jhi-social-media-mi-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeypeSelect = element(by.id('field_typeype'));
    urlInput = element(by.id('field_url'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTypeypeSelect(typeype): promise.Promise<void> {
        return this.typeypeSelect.sendKeys(typeype);
    }

    getTypeypeSelect() {
        return this.typeypeSelect.element(by.css('option:checked')).getText();
    }

    typeypeSelectLastOption(): promise.Promise<void> {
        return this.typeypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setUrlInput(url): promise.Promise<void> {
        return this.urlInput.sendKeys(url);
    }

    getUrlInput() {
        return this.urlInput.getAttribute('value');
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
