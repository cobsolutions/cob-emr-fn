import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../../common/service/encyrption/encrypt.service';

interface ScheduledPatient {
  id: string;
  name: string;
  initials: string;
  gender: 'male' | 'female';
  time: string;
  duration: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  provider: string;
}

interface CalendarDay {
  date: Date;
  iso: string;
  weekdayShort: string;
  dayNumber: number;
  isToday: boolean;
  appointmentCount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /** 7-day strip shown in the scheduled-appointments header. */
  weekDays: CalendarDay[] = [];

  /** Currently selected ISO date (yyyy-mm-dd). */
  selectedDateIso = '';

  /** Free-text search across patient name / type / provider. */
  searchTerm = '';

  /** Status filter chip: '' = all */
  statusFilter: '' | 'confirmed' | 'pending' | 'cancelled' = '';

  /** Pagination state. */
  currentPage = 1;
  pageSize = 10;
  readonly pageSizeOptions = [10, 25, 50, 100];

  /** Mock appointments keyed by ISO date. Replace with real service later. */
  private appointmentsByDate: Record<string, ScheduledPatient[]> = {};

  constructor(private encryptService: EncryptService) { }

  ngOnInit(): void {
    const enc = this.encryptService.encrypt('Khaled@123');
    console.log(this.encryptService.decrypt(enc));

    this.buildMockAppointments();
    this.buildWeekStrip();
    const today = this.toIso(new Date());
    this.selectedDateIso = today;
  }

  selectDay(day: CalendarDay): void {
    this.selectedDateIso = day.iso;
    this.currentPage = 1;
  }

  shiftWeek(direction: -1 | 1): void {
    const first = this.weekDays[0].date;
    const newAnchor = new Date(first);
    newAnchor.setDate(first.getDate() + direction * 7);
    this.buildWeekStrip(newAnchor);
  }

  goToToday(): void {
    this.buildWeekStrip();
    this.selectedDateIso = this.toIso(new Date());
    this.currentPage = 1;
  }

  get selectedAppointments(): ScheduledPatient[] {
    return this.appointmentsByDate[this.selectedDateIso] || [];
  }

  get filteredAppointments(): ScheduledPatient[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.selectedAppointments.filter(p => {
      if (this.statusFilter && p.status !== this.statusFilter) { return false; }
      if (!term) { return true; }
      return (
        p.name.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term) ||
        p.provider.toLowerCase().includes(term)
      );
    });
  }

  get statusCounts(): { all: number; confirmed: number; pending: number; cancelled: number } {
    const list = this.selectedAppointments;
    return {
      all: list.length,
      confirmed: list.filter(p => p.status === 'confirmed').length,
      pending: list.filter(p => p.status === 'pending').length,
      cancelled: list.filter(p => p.status === 'cancelled').length
    };
  }

  setStatusFilter(filter: '' | 'confirmed' | 'pending' | 'cancelled'): void {
    this.statusFilter = filter;
    this.currentPage = 1;
  }

  onSearchInput(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
  }

  // --- Pagination ---

  get paginatedAppointments(): ScheduledPatient[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAppointments.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredAppointments.length / this.pageSize));
  }

  get paginationRange(): { start: number; end: number; total: number } {
    const total = this.filteredAppointments.length;
    if (total === 0) { return { start: 0, end: 0, total: 0 }; }
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, total);
    return { start, end, total };
  }

  /** Build a compact page list with ellipses, e.g. [1, '…', 4, 5, 6, '…', 20]. */
  get visiblePages(): Array<number | 'ellipsis'> {
    const total = this.totalPages;
    const current = this.currentPage;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages: Array<number | 'ellipsis'> = [1];
    if (current > 3) { pages.push('ellipsis'); }
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) { pages.push(i); }
    if (current < total - 2) { pages.push('ellipsis'); }
    pages.push(total);
    return pages;
  }

  setPage(page: number | 'ellipsis'): void {
    if (page === 'ellipsis') { return; }
    if (page < 1 || page > this.totalPages) { return; }
    this.currentPage = page;
  }

  onPageSizeChange(event: Event): void {
    const val = Number((event.target as HTMLSelectElement).value);
    if (!val) { return; }
    this.pageSize = val;
    this.currentPage = 1;
  }

  trackByPage(_: number, p: number | 'ellipsis'): string | number { return p; }

  get selectedDateLabel(): string {
    const d = this.parseIso(this.selectedDateIso);
    if (!d) { return ''; }
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  trackByDayIso(_: number, day: CalendarDay): string { return day.iso; }
  trackByPatientId(_: number, p: ScheduledPatient): string { return p.id; }

  // --- helpers ---

  private buildWeekStrip(anchor: Date = new Date()): void {
    // Start the strip at Monday of the anchor's week.
    const start = new Date(anchor);
    const day = start.getDay(); // 0=Sun..6=Sat
    const offsetToMonday = (day === 0 ? -6 : 1 - day);
    start.setDate(start.getDate() + offsetToMonday);
    start.setHours(0, 0, 0, 0);

    const todayIso = this.toIso(new Date());
    const days: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = this.toIso(d);
      days.push({
        date: d,
        iso,
        weekdayShort: d.toLocaleDateString(undefined, { weekday: 'short' }),
        dayNumber: d.getDate(),
        isToday: iso === todayIso,
        appointmentCount: (this.appointmentsByDate[iso] || []).length
      });
    }
    this.weekDays = days;
  }

  private toIso(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private parseIso(iso: string): Date | null {
    if (!iso) { return null; }
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) { return null; }
    return new Date(y, m - 1, d);
  }

  private buildMockAppointments(): void {
    // Seed a few days around today so the calendar has something to show.
    const today = new Date();
    const offset = (days: number) => {
      const d = new Date(today);
      d.setDate(today.getDate() + days);
      return this.toIso(d);
    };

    this.appointmentsByDate = {
      [offset(-1)]: [
        { id: 'y1', name: 'Laura Bennett', initials: 'LB', gender: 'female', time: '09:00 AM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 'y2', name: 'Marcus Cole', initials: 'MC', gender: 'male', time: '11:30 AM', duration: '45 min', type: 'Initial Evaluation', status: 'confirmed', provider: 'Dr. Reed' }
      ],
      [offset(0)]: [
        { id: 't01', name: 'John Doe', initials: 'JD', gender: 'male', time: '08:00 AM', duration: '30 min', type: 'Physical Therapy - Follow-up', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't02', name: 'Sarah Miller', initials: 'SM', gender: 'female', time: '08:30 AM', duration: '45 min', type: 'Initial Evaluation', status: 'pending', provider: 'Dr. Patel' },
        { id: 't03', name: 'Robert Johnson', initials: 'RJ', gender: 'male', time: '09:00 AM', duration: '30 min', type: 'Occupational Therapy', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't04', name: 'Emily Watson', initials: 'EW', gender: 'female', time: '09:30 AM', duration: '60 min', type: 'Re-evaluation', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't05', name: 'Michael Kim', initials: 'MK', gender: 'male', time: '10:00 AM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't06', name: 'Olivia Martin', initials: 'OM', gender: 'female', time: '10:30 AM', duration: '45 min', type: 'Manual Therapy', status: 'pending', provider: 'Dr. Patel' },
        { id: 't07', name: 'Noah Rivera', initials: 'NR', gender: 'male', time: '11:00 AM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't08', name: 'Ava Collins', initials: 'AC', gender: 'female', time: '11:30 AM', duration: '30 min', type: 'Dry Needling', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't09', name: 'Liam Parker', initials: 'LP', gender: 'male', time: '12:00 PM', duration: '45 min', type: 'Initial Evaluation', status: 'pending', provider: 'Dr. Reed' },
        { id: 't10', name: 'Sophia Reed', initials: 'SR', gender: 'female', time: '12:30 PM', duration: '30 min', type: 'Follow-up', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't11', name: 'Ethan Wright', initials: 'EW', gender: 'male', time: '01:00 PM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't12', name: 'Mia Thompson', initials: 'MT', gender: 'female', time: '01:30 PM', duration: '45 min', type: 'Occupational Therapy', status: 'cancelled', provider: 'Dr. Patel' },
        { id: 't13', name: 'Lucas Hall', initials: 'LH', gender: 'male', time: '02:00 PM', duration: '30 min', type: 'Follow-up', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't14', name: 'Charlotte Young', initials: 'CY', gender: 'female', time: '02:30 PM', duration: '60 min', type: 'Re-evaluation', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't15', name: 'Mason Allen', initials: 'MA', gender: 'male', time: '03:00 PM', duration: '30 min', type: 'Manual Therapy', status: 'pending', provider: 'Dr. Reed' },
        { id: 't16', name: 'Amelia Scott', initials: 'AS', gender: 'female', time: '03:30 PM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't17', name: 'Logan Nelson', initials: 'LN', gender: 'male', time: '04:00 PM', duration: '45 min', type: 'Initial Evaluation', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't18', name: 'Harper Baker', initials: 'HB', gender: 'female', time: '04:30 PM', duration: '30 min', type: 'Dry Needling', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't19', name: 'Elijah Carter', initials: 'EC', gender: 'male', time: '05:00 PM', duration: '30 min', type: 'Follow-up', status: 'pending', provider: 'Dr. Reed' },
        { id: 't20', name: 'Evelyn Morris', initials: 'EM', gender: 'female', time: '05:30 PM', duration: '45 min', type: 'Re-evaluation', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't21', name: 'James Rogers', initials: 'JR', gender: 'male', time: '06:00 PM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 't22', name: 'Abigail Cook', initials: 'AC', gender: 'female', time: '06:30 PM', duration: '30 min', type: 'Manual Therapy', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 't23', name: 'Benjamin Bell', initials: 'BB', gender: 'male', time: '07:00 PM', duration: '45 min', type: 'Initial Evaluation', status: 'pending', provider: 'Dr. Reed' },
        { id: 't24', name: 'Ella Murphy', initials: 'EM', gender: 'female', time: '07:30 PM', duration: '30 min', type: 'Follow-up', status: 'confirmed', provider: 'Dr. Patel' }
      ],
      [offset(1)]: [
        { id: 'w1', name: 'Daniel Clark', initials: 'DC', gender: 'male', time: '08:30 AM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Reed' },
        { id: 'w2', name: 'Grace Lee', initials: 'GL', gender: 'female', time: '10:00 AM', duration: '45 min', type: 'Initial Evaluation', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 'w3', name: 'Henry Adams', initials: 'HA', gender: 'male', time: '02:00 PM', duration: '30 min', type: 'Follow-up', status: 'pending', provider: 'Dr. Reed' }
      ],
      [offset(2)]: [
        { id: 'r1', name: 'Isabella Turner', initials: 'IT', gender: 'female', time: '09:30 AM', duration: '60 min', type: 'Re-evaluation', status: 'confirmed', provider: 'Dr. Patel' },
        { id: 'r2', name: 'Jack Hughes', initials: 'JH', gender: 'male', time: '11:00 AM', duration: '30 min', type: 'Physical Therapy', status: 'confirmed', provider: 'Dr. Reed' }
      ],
      [offset(3)]: [
        { id: 'f1', name: 'Katherine Brooks', initials: 'KB', gender: 'female', time: '10:15 AM', duration: '45 min', type: 'Occupational Therapy', status: 'confirmed', provider: 'Dr. Reed' }
      ]
    };
  }

}
