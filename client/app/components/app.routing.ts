import { ROUTER_DIRECTIVES }   from '@angular/router';


import { FormComponent } from './form/form.component';
import { FormItemComponent } from './form/formItem/formItem.component';
import { Graphs } from './graphs/graphs.component';


export const appRoutes = [
  { path: '', component: FormComponent },
  { path: 'form', component: FormComponent },
  { path: 'item', component: FormItemComponent },
  { path: 'graphs', component: Graphs },
  { path: '**', redirectTo: '' }
];
