import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { NotesComponentsPage, NotesUpdatePage } from './notes-mi.page-object';

describe('Notes e2e test', () => {
    let navBarPage: NavBarPage;
    let notesUpdatePage: NotesUpdatePage;
    let notesComponentsPage: NotesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Notes', () => {
        navBarPage.goToEntity('notes-mi');
        notesComponentsPage = new NotesComponentsPage();
        expect(notesComponentsPage.getTitle()).toMatch(/ministeringApp.notes.home.title/);
    });

    it('should load create Notes page', () => {
        notesComponentsPage.clickOnCreateButton();
        notesUpdatePage = new NotesUpdatePage();
        expect(notesUpdatePage.getPageTitle()).toMatch(/ministeringApp.notes.home.createOrEditLabel/);
        notesUpdatePage.cancel();
    });

    it('should create and save Notes', () => {
        notesComponentsPage.clickOnCreateButton();
        notesUpdatePage.typeSelectLastOption();
        notesUpdatePage.setNoteInput('note');
        expect(notesUpdatePage.getNoteInput()).toMatch('note');
        notesUpdatePage.save();
        expect(notesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
