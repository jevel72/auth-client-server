import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

import { RegisterGuard } from './guards/register.guard';
import { UsersGuard } from './guards/users.guard';
import { LoginGuard } from './guards/login.guard';
import { EditUserGuard } from './guards/edit-user.guard';
import { ProfileGuard } from './guards/profile.guard';

const MainRoute: Route = {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
};

const LoginRoute: Route = {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
};

const UsersRoute: Route = {
    path: 'users',
    component: UsersComponent,
    canActivate: [UsersGuard],
};

const RegisterRoute: Route = {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterGuard],
};

const ProfileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard],
};

const EditUserRoute: Route = {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [EditUserGuard],
};

const NotFoundRoute: Route = {
    path: '**',
    component: NotFoundComponent,
};

const routes: Routes = [
    MainRoute,
    LoginRoute,
    UsersRoute,
    RegisterRoute,
    ProfileRoute,
    EditUserRoute,
    NotFoundRoute,
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        LoginGuard,
        RegisterGuard,
        EditUserGuard,
        UsersGuard,
        ProfileGuard,
    ],
})
export class AppRoutingModule {}