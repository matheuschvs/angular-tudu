import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPageContainerComponent } from './components/form-page-container/form-page-container.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { InputComponent } from './components/input/input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { LoginService } from './services/login.service';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TodoService } from './services/todo.service';
import { CustomDatePipe } from './utils/datePipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    FormPageContainerComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    HomeComponent,
    InputComponent,
    PasswordInputComponent,
    CheckboxComponent,
    TodoComponent,
    CustomDatePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    AngularToastifyModule
  ],
  providers: [
    LoginService,
    ToastService,
    TodoService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
