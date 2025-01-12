import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

import { GlobalSpinnerService } from '../../services/global-spinner/global-spinner.service';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.scss',
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class GlobalSpinnerComponent {
  private readonly _globalSpinnerService = inject(GlobalSpinnerService);
  public isLoading = this._globalSpinnerService.isLoading;
}
