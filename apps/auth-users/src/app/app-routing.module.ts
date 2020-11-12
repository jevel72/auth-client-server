import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

import { UserLoggedInGuard } from './guards/user-logged-in.guard';
import { EditUserGuard } from './guards/edit-user.guard';
import { UserLoggedOutGuard } from './guards/user-logged-out.guard';

const MainRoute: Route = {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
};

const LoginRoute: Route = {
    path: 'login',
    component: LoginComponent,
    canActivate: [UserLoggedInGuard],
};

const UsersRoute: Route = {
    path: 'users',
    component: UsersComponent,
    canActivate: [UserLoggedOutGuard],
};

const RegisterRoute: Route = {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UserLoggedInGuard],
};

const ProfileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserLoggedOutGuard],
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
        EditUserGuard,
        UserLoggedInGuard,
        UserLoggedOutGuard,
    ],
})
export class AppRoutingModule {}
