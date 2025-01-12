import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalSpinnerService {
  public readonly isLoading = signal(false);
}
