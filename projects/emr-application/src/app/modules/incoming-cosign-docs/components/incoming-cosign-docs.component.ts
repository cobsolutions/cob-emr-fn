import { Component, OnInit } from '@angular/core';
import { LoggedInService } from '../../security/service/loggedIn/logged-in.service';
import { IncomingCosignDocsService } from '../services/incoming-cosign-docs.service';

@Component({
  selector: 'app-incoming-cosign-docs',
  templateUrl: './incoming-cosign-docs.component.html',
  styleUrls: ['./incoming-cosign-docs.component.css']
})
export class IncomingCosignDocsComponent implements OnInit {

  cosignDocs: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private cosignDocsService: IncomingCosignDocsService,
    private loggedInService: LoggedInService
  ) { }

  ngOnInit(): void {
    this.loadForwardedDocs();
  }

  loadForwardedDocs(): void {
    const providerId = this.loggedInService.getLoggedUser().uuid;
    if (!providerId) {
      this.errorMessage = 'Unable to identify the logged-in provider.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.cosignDocsService.getForwardedDocs(providerId).subscribe({
      next: (data) => {
        this.cosignDocs = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load incoming cosign documents. Please try again.';
        this.loading = false;
      }
    });
  }

  onDocClick(doc: any): void {
    // TODO: Navigate to review/finalize component
  }

}
