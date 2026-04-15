# Front End — Quick Tech Reference

A fast, tech-only summary of [frontend.md](frontend.md). Use this as a cheat sheet; jump to the LLD for reasoning and edge cases.

---

## 1. Stack

| Layer | Tech |
|---|---|
| Framework | Angular 14 |
| UI | CoreUI Angular Pro, Bootstrap 5, Angular Material |
| Identity | `keycloak-angular` + `keycloak-js` |
| Forms | Reactive (new code) + template-driven (legacy) |
| Notifications / spinner | `ngx-toastr`, `ngx-spinner` |
| Build | Angular CLI |

Workspace (`angular.json`) has two projects: `emr-application` (app) and `angular-calendar` (lib).

---

## 2. Architecture at a glance

```
Browser (Angular SPA) ──▶ Nginx ──▶ EMR Backend API
        │                                 ▲
        └────── login ─▶ Keycloak ────────┘ (JWT verify)
```

- SPA hosts UI, routing, session.
- Tokens live only in `keycloak-js` memory (no localStorage).
- All frontend role checks are cosmetic; backend is the authority.

---

## 3. Folder shape

```
projects/emr-application/src/app/
├── app.module.ts / app-routing.module.ts / app.component.*
├── core/           # layouts: default, organization, signature
├── util/           # helpers + BasicComponent
└── modules/        # lazy feature modules
    ├── security/   # the critical module (§4)
    ├── organization/ patient/ clinic/ users/ scheduler/ ...
    └── common/     # shared dialogs, pipes, services
```

Each feature: `*.module.ts`, `*-routing.module.ts`, `components/`, `services/`, `models/`.

---

## 4. Security — three connection points

| Hook | When | Role |
|---|---|---|
| `APP_INITIALIZER` (`keycloak-initializer.ts`) | Once at bootstrap | `keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false })` — silently resume session |
| `KcAuthGuard` (`kc-auth.guard.ts`) | Every route navigation | Extends `KeycloakAuthGuard`. Redirects to login, builds sidebar, fetches logged-in user, evaluates `data.roles` / default redirects |
| `AuthInterceptor` (`auth.interceptor.ts`) | Every HTTP request | Attaches `Bearer <access_token>`; handles 401 → logout, 403 pending → `EMPTY` + flag for guard |

Supporting pieces: `PendingActivationGuard` (canActivateChild fencing), `MenuItemsConstructor` + role converters (sidebar), `LoggedInService`, `PermissionService`.

### Roles

13 realm-role constants in `model/role.ts` (e.g. `admin-role`, `user-role`, `clinic-role`, `medical-note-role`, ...). Must exist in Keycloak realm.

---

## 5. Routing & layouts

Two shells, **URL-driven** (not role-driven):

| URL prefix | Layout | Notes |
|---|---|---|
| `/emr/**` | `DefaultLayoutComponent` | Main authenticated shell |
| `/emr-signature/**` | `SignatureLayoutComponent` | Minimal shell for doctor signature; bypasses pending-status fences |

Role-based *landing* happens inside the default shell via `data.defaultRedirect`:
- admin → `/emr/organization/list`
- other → `/emr/dashboard`

Shell is **not re-instantiated** on child navigation — only `<router-outlet>` swaps.

---

## 6. Bootstrap timeline

```
main.ts → bootstrapModule(AppModule)
  ├─ APP_INITIALIZER → keycloak.init(check-sso)
  ├─ HTTP_INTERCEPTORS → AuthInterceptor
  └─ Router first navigation
       ├─ KcAuthGuard.canActivate (login / menu / user / role gate)
       ├─ PendingActivationGuard.canActivateChild
       └─ lazy-load feature module → render
```

---

## 7. Entry point — Create Organization

- Routes under `/emr/organization`: `list`, `create`, `edit/:id`, `:id/users`.
- `CreateOrganizationComponent` is dual-mode (create + edit), template-driven forms, extends `BasicComponent`.
- Composes `AddressComponent` and `OrganizationClinicsCreationComponent` via `@ViewChild`.
- `OrganizationService.adminDoctor$` (BehaviorSubject) bridges admin-doctor modal ↔ clinics form.
- API: `GET/POST/PUT /emr/api/organization/...`.

---

## 8. Environments

| Env | Keycloak | API | Dev tip |
|---|---|---|---|
| dev | `http://localhost:8082` | `/emr/api/` | `npm run startlocal` (proxies to `127.0.0.1:7070`) |
| prod | Heroku-hosted KC | `/emr/api/` | Nginx `proxy_pass` |

Bundle budgets: warn 2 MB, error 5 MB — split lazy modules instead of raising caps.

---

## 9. Conventions worth knowing

- New features: reactive forms. Existing organization/patient area: template-driven — keep the style when extending.
- Cross-module models exist (e.g. `ClinicDataHolder` imported from `patient/`) — edit carefully.
- Menu entries need three touches: `_nav.ts`, matching role converter, `MenuItemsConstructor.construct`.
- `/emr-signature/*` is exempt from 403-pending redirects — never remove that bypass.

---

## 10. See also

- Full LLD → [frontend.md](frontend.md)
- Identity deep dive → [keycloak.md](keycloak.md)
