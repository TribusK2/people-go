import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [MatButtonModule, MatIconModule],
})
export class NotFoundComponent {
  private readonly _router: Router = inject(Router);

  public goToHomePage(): void {
    this._router.navigate(['/']);
  }
}
