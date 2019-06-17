import { Observable } from 'rxjs';
import { OpcoesItemPedidoPageModule } from './pages/opcoes-item-pedido/opcoes-item-pedido.module';
import { Alerta } from './Utils/Alerta';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './services/user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ShareModule } from './share.module';
import { IonicStorageModule } from '@ionic/storage';
import { DatabaseService } from './services/database.service';
import { ComponentsModule } from './components/components.module';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { DatePicker } from '@ionic-native/date-picker/ngx';
registerLocaleData(pt, 'pt-BR');

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/termos-de-uso',
  privacyPolicyUrl: '/privacidade',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInSuccessUrl: '/login-externo',

  callbacks: {
    signInSuccessWithAuthResult: (user: any) => {
      return true;
    }
  },
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ShareModule,
    ComponentsModule,
    IonicStorageModule.forRoot(),
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    Alerta,
    DatabaseService,
    Storage,
    DatePicker,
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {}
