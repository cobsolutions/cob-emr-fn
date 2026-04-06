import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggedInService } from '../../security/service/loggedIn/logged-in.service';
import { IncomingCosignDocsService } from '../services/incoming-cosign-docs.service';

@Component({
  selector: 'app-incoming-cosign-docs',
  templateUrl: './incoming-cosign-docs.component.html',
  styleUrls: ['./incoming-cosign-docs.component.css']
})
export class IncomingCosignDocsComponent implements OnInit, OnDestroy {

  cosignDocs: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  private allDocs: any[] = [];
  private clinicSub: Subscription;

  constructor(
    private cosignDocsService: IncomingCosignDocsService,
    private loggedInService: LoggedInService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadForwardedDocs();
    this.clinicSub = this.loggedInService.selectedClinic$.subscribe(clinicId => {
      this.filterByClinic(clinicId);
    });
  }

  ngOnDestroy(): void {
    this.clinicSub?.unsubscribe();
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
        this.allDocs = data;
        this.filterByClinic(this.loggedInService.selectedClinic$.value);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load incoming cosign documents. Please try again.';
        this.loading = false;
      }
    });
  }

  private filterByClinic(clinicId: number | null): void {
    if (!clinicId) {
      this.cosignDocs = this.allDocs;
      return;
    }
    this.cosignDocs = this.allDocs.filter(doc =>
      doc.patient?.clinicIds?.includes(clinicId)
    );
  }

  onDocClick(doc: any): void {
    this.router.navigate([
      'emr/patient/cosign-review',
      doc.noteId,
      doc.noteType,
      doc.patientCaseId
    ]);
  }

}
