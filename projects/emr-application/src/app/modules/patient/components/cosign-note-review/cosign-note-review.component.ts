import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Component({
  selector: 'app-cosign-note-review',
  templateUrl: './cosign-note-review.component.html',
  styleUrls: ['./cosign-note-review.component.css']
})
export class CosignNoteReviewComponent implements OnInit {

  noteId: string;
  noteType: string;
  caseId: string;
  noteAction: string;
  coSigner: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loggedInService: LoggedInService
  ) { }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('noteId');
    this.noteType = this.route.snapshot.paramMap.get('noteType');
    this.caseId = this.route.snapshot.paramMap.get('caseId');
    this.coSigner = this.loggedInService.getLoggedUser().uuid;
    this.noteAction = this.mapNoteType(this.noteType);
  }

  private mapNoteType(noteType: string): string {
    switch (noteType) {
      case 'INITIAL_EXAM': return 'Initial_Examination';
      case 'DAILY': case 'DAILY_NOTE': return 'Daily_Note';
      case 'PROGRESS': case 'PROGRESS_NOTE': return 'Progress_Note';
      case 'QUICK_DISCHARGE': case 'QUICK_DISCHARGE_NOTE': return 'Quick_Discharge';
      case 'DISCHARGE': case 'DISCHARGE_NOTE': return 'Discharge';
      default: return noteType;
    }
  }

  goBack(): void {
    this.router.navigate(['/emr/incoming-cosign-docs']);
  }

}
