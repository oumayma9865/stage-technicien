import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { TesthomeComponent } from './admin-interface/test-home/test-home.component';
import { AddtestComponent } from './admin-interface/add-test/add-test.component';
import { QuizhomeComponent } from './admin-interface/quiz-home/quiz-home.component';
import { AddquizComponent } from './admin-interface/add-quiz/add-quiz.component'; 
import { CandidatsComponent } from './admin-interface/candidats/candidats.component';
import { ResultsComponent } from './admin-interface/results/results.component'; 
import { InviteCandidatComponent } from './admin-interface/invite-candidat/invite-candidat.component';
import { TestdetailsComponent } from './admin-interface/test-details/test-details.component';
import { QuizdetailsComponent } from './admin-interface/quiz-details/quiz-details.component';
import { LoadingComponent } from './admin-interface/loading/loading.component';
import { TestCandidatComponent } from './candidat-interface/test-candidat/test-candidat.component';
import { ErrorCheatingComponent } from './candidat-interface/error-cheating/error-cheating.component';
import { GuideTestComponent } from './candidat-interface/guide-test/guide-test.component';
import { HomeCandidatComponent } from './candidat-interface/home-candidat/home-candidat.component';
import { ResultsCandidatComponent } from './candidat-interface/results-candidat/results-candidat.component';
import { AdminGuard } from './services/admin.guard';
import { ProfileComponent } from './candidat-interface/profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'adminhome', component: TesthomeComponent,canActivate:[AdminGuard]},
    { path: 'addtest', component:AddtestComponent},
    { path: 'quizhome', component:QuizhomeComponent},
    { path: 'addquiz', component:AddquizComponent},
    { path: 'candidathome', component:CandidatsComponent},
    { path: 'results', component:ResultsComponent},
    { path: 'invitecandidat/:id', component:InviteCandidatComponent},
    {path:'testdetails/:id',    component:TestdetailsComponent},
    {path:'quizdetails/:id', component:QuizdetailsComponent},
    {path:'loading', component:LoadingComponent},
    {path:'test-candidat/:id', component:TestCandidatComponent},
    {path:'error',component:ErrorCheatingComponent},
    {path:'guide/:id', component:GuideTestComponent},
    {path:'home-candidat', component:HomeCandidatComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {path:'results-candidat/:id', component:ResultsCandidatComponent}
   
];
