import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TutorialesComponent } from './pages/tutoriales/tutoriales.component';

export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'contacto', component: ContactoComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'tutoriales', component: TutorialesComponent },
  { path: '**', redirectTo: '' }
];
