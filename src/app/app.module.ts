import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { apiMockInterceptor } from './interceptors/api-mock.interceptor';
import { GlobalSpinnerComponent } from './components/global-spinner/global-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    GlobalSpinnerComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([apiMockInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
