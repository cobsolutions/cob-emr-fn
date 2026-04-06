import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { ReferringProvider } from '../../model/referring.provider';
import { ReferringProviderService } from '../../service/referring-provider.service';

export interface NppesAddress {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  fax?: string;
  purpose?: string;
}

export interface NppesTaxonomy {
  code?: string;
  desc?: string;
  state?: string;
  license?: string;
  primary?: boolean;
}

export interface NppesProvider {
  firstName?: string;
  lastName?: string;
  npi?: string;
  addresses?: NppesAddress[];
  taxonomies?: NppesTaxonomy[];
}

@Component({
  selector: 'create-referring-provider',
  templateUrl: './create-referring-provider.component.html',
  styleUrls: ['./create-referring-provider.component.css']
})
export class CreateReferringProviderComponent implements OnInit {
  referringProvider: ReferringProvider = {}
  @Input() mode?: string
  @Input() componentRole: string[]
  @Input() selectedreferringProvider: ReferringProvider
  @Output() changeVisibility = new EventEmitter<string>()
  @ViewChild('errorBanner') errorBanner: ElementRef

  searchCriteria: { firstName?: string; lastName?: string; npi?: string } = {};
  searchResults: NppesProvider[] = [];
  isSearching = false;
  isSubmitting = false;
  submitError = '';
  hasSearched = false;
  selectedIndex = -1;
  selectedProvider: NppesProvider | null = null;
  filterText = '';

  get filteredResults(): NppesProvider[] {
    if (!this.filterText) return this.searchResults;
    const term = this.filterText.toLowerCase();
    return this.searchResults.filter(p =>
      (p.firstName?.toLowerCase().includes(term)) ||
      (p.lastName?.toLowerCase().includes(term)) ||
      (p.npi?.toLowerCase().includes(term)) ||
      (p.taxonomies?.some(t => t.desc?.toLowerCase().includes(term)))
    );
  }

  constructor(private referringProviderService: ReferringProviderService
    , private toastr: ToastrService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    if (this.selectedreferringProvider)
      this.referringProvider = this.selectedreferringProvider
  }

  searchProviders() {
    let search$: Observable<any>;

    if (this.searchCriteria.npi) {
      search$ = this.referringProviderService.searchByNpi(this.searchCriteria.npi);
    } else if (this.searchCriteria.firstName && this.searchCriteria.lastName) {
      search$ = this.referringProviderService.searchByFirstAndLastName(this.searchCriteria.firstName, this.searchCriteria.lastName);
    } else if (this.searchCriteria.lastName) {
      search$ = this.referringProviderService.searchByLastName(this.searchCriteria.lastName);
    } else if (this.searchCriteria.firstName) {
      search$ = this.referringProviderService.searchByFirstName(this.searchCriteria.firstName);
    } else {
      return;
    }

    this.isSearching = true;
    this.hasSearched = true;
    this.selectedIndex = -1;
    this.selectedProvider = null;
    this.filterText = '';

    search$.subscribe({
      next: (result: any) => {
        const nppesResults = result?.records?.results || [];
        this.searchResults = nppesResults.map((item: any) => ({
          firstName: item.basic?.first_name,
          lastName: item.basic?.last_name,
          npi: item.number,
          addresses: (item.addresses || []).map((addr: any) => ({
            address1: addr.address_1,
            address2: addr.address_2,
            city: addr.city,
            state: addr.state,
            postalCode: addr.postal_code,
            phone: addr.telephone_number,
            fax: addr.fax_number,
            purpose: addr.address_purpose
          })),
          taxonomies: (item.taxonomies || []).map((tax: any) => ({
            code: tax.code,
            desc: tax.desc,
            state: tax.state,
            license: tax.license,
            primary: tax.primary
          }))
        }));
        this.isSearching = false;
      },
      error: () => {
        this.searchResults = [];
        this.isSearching = false;
        this.toastr.error('Search failed. Please try again.');
      }
    });
  }

  selectProvider(provider: NppesProvider, index: number) {
    this.selectedIndex = index;
    this.selectedProvider = provider;
    this.referringProvider.firstName = provider.firstName;
    this.referringProvider.lastName = provider.lastName;
    this.referringProvider.npi = provider.npi;

    const locationAddr = this.getLocationAddress(provider);
    this.referringProvider.phone = locationAddr?.phone || '';
    this.referringProvider.address = locationAddr
      ? [locationAddr.address1, locationAddr.address2, locationAddr.city, locationAddr.state, locationAddr.postalCode]
          .filter(Boolean).join(', ')
      : '';

    const primaryTax = this.getPrimaryTaxonomy(provider);
    this.referringProvider.specialty = primaryTax?.desc || '';
  }

  getPrimaryTaxonomy(provider: NppesProvider): NppesTaxonomy | undefined {
    return provider.taxonomies?.find(t => t.primary) || provider.taxonomies?.[0];
  }

  getLocationAddress(provider: NppesProvider): NppesAddress | undefined {
    return provider.addresses?.find(a => a.purpose === 'LOCATION') || provider.addresses?.[0];
  }

  onNpiKeyDown(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }

  clearSearch() {
    this.searchCriteria = {};
    this.searchResults = [];
    this.hasSearched = false;
    this.selectedIndex = -1;
    this.selectedProvider = null;
    this.filterText = '';
  }

  submit() {
    if (this.mode === 'create')
      this.create();
    if (this.mode === 'update')
      this.update()
  }

  dismissError() {
    this.submitError = '';
  }

  private scrollToError() {
    setTimeout(() => {
      this.errorBanner?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  private create() {
    this.isSubmitting = true;
    this.submitError = '';
    this.referringProvider.organizationId = this.loggedInService.getLoggedUser().organizationId
    this.referringProviderService.create(this.referringProvider)
      .subscribe({
        next: (result) => {
          this.isSubmitting = false;
          this.changeVisibility.emit('create-close')
          this.toastr.success('Referring Provider Created.');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submitError = err?.error?.message || 'Failed to create Referring Provider. Please try again.';
          this.scrollToError();
        }
      })
  }

  private update() {
    this.isSubmitting = true;
    this.submitError = '';
    this.referringProviderService.update(this.referringProvider)
      .subscribe({
        next: (result) => {
          this.isSubmitting = false;
          this.changeVisibility.emit('update-close')
          this.toastr.success('Referring Provider updated.');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submitError = err?.error?.message || 'Failed to update Referring Provider. Please try again.';
          this.scrollToError();
        }
      })
  }
}
