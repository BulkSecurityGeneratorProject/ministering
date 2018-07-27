import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { SocialMediaComponentsPage, SocialMediaUpdatePage } from './social-media-mi.page-object';

describe('SocialMedia e2e test', () => {
    let navBarPage: NavBarPage;
    let socialMediaUpdatePage: SocialMediaUpdatePage;
    let socialMediaComponentsPage: SocialMediaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SocialMedias', () => {
        navBarPage.goToEntity('social-media-mi');
        socialMediaComponentsPage = new SocialMediaComponentsPage();
        expect(socialMediaComponentsPage.getTitle()).toMatch(/ministeringApp.socialMedia.home.title/);
    });

    it('should load create SocialMedia page', () => {
        socialMediaComponentsPage.clickOnCreateButton();
        socialMediaUpdatePage = new SocialMediaUpdatePage();
        expect(socialMediaUpdatePage.getPageTitle()).toMatch(/ministeringApp.socialMedia.home.createOrEditLabel/);
        socialMediaUpdatePage.cancel();
    });

    it('should create and save SocialMedias', () => {
        socialMediaComponentsPage.clickOnCreateButton();
        socialMediaUpdatePage.typeypeSelectLastOption();
        socialMediaUpdatePage.setUrlInput('url');
        expect(socialMediaUpdatePage.getUrlInput()).toMatch('url');
        socialMediaUpdatePage.save();
        expect(socialMediaUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
