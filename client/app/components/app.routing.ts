import { ROUTER_DIRECTIVES }   from '@angular/router';


import { FormComponent } from './form/form.component';
import { Graphs } from './graphs/graphs.component';

export const appRoutes = [
  { path: '', component: FormComponent },
  { path: 'graphs', component: Graphs }
];

