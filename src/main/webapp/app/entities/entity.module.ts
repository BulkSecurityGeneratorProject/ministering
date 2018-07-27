import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MinisteringOrgMiModule } from './org-mi/org-mi.module';
import { MinisteringFamilyMiModule } from './family-mi/family-mi.module';
import { MinisteringMemberMiModule } from './member-mi/member-mi.module';
import { MinisteringCompanionshipMiModule } from './companionship-mi/companionship-mi.module';
import { MinisteringPhoneMiModule } from './phone-mi/phone-mi.module';
import { MinisteringEmailMiModule } from './email-mi/email-mi.module';
import { MinisteringSocialMediaMiModule } from './social-media-mi/social-media-mi.module';
import { MinisteringNotesMiModule } from './notes-mi/notes-mi.module';
import { MinisteringStewardshipMiModule } from './stewardship-mi/stewardship-mi.module';
import { MinisteringCompanionMiModule } from './companion-mi/companion-mi.module';
import { MinisteringAssignmentMiModule } from './assignment-mi/assignment-mi.module';
import { MinisteringMinistryMiModule } from './ministry-mi/ministry-mi.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        MinisteringOrgMiModule,
        MinisteringFamilyMiModule,
        MinisteringMemberMiModule,
        MinisteringCompanionshipMiModule,
        MinisteringPhoneMiModule,
        MinisteringEmailMiModule,
        MinisteringSocialMediaMiModule,
        MinisteringNotesMiModule,
        MinisteringStewardshipMiModule,
        MinisteringCompanionMiModule,
        MinisteringAssignmentMiModule,
        MinisteringMinistryMiModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinisteringEntityModule {}
