import { AuthGuard } from './guards/auth.guard';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/clients/client-details/client-details.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'clients/details/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  { path: 'clients/new', component: AddClientComponent, canActivate: [AuthGuard]},
  { path: 'clients/edit/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    ClientDetailsComponent,
    HomeComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    SnotifyModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    ClientService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
