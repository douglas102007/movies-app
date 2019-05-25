import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService, CredentialsService, CoreModule } from '@app/core';
import { MockAuthenticationService } from '@app/core/authentication/authentication.service.mock';
import { MockCredentialsService } from '@app/core/authentication/credentials.service.mock';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';

describe('ShellComponent', () => {});
