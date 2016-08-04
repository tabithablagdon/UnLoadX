import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app.component';

bootstrap(AppComponent)
.catch(err => console.log(`Error bootstrapping App ${err}`));
