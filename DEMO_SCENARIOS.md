# COB EMR - Stakeholder Demo Scenarios

---

## Scenario 1: Create Organization with Clinics and Root Doctor

**Goal:** Register a new organization, add clinics, and set up the root administrator doctor.

### Steps

1. Navigate to the **Sign Up** page.
2. Fill in **Essential Information**:
   - Organization Name: `COB Physical Therapy Group`
   - DBA: `COB PT`
   - Group NPI: `1234567890`
   - Tax ID: `98-7654321`
   - Billing Address: `100 Main St, Suite 200, New York, NY, 10001`
3. Add **Clinic(s)**:
   - Clinic 1 - Name: `COB Downtown Clinic`, Address: `100 Main St, Suite 200, New York, NY, 10001`
   - Clinic 2 - Name: `COB Midtown Clinic`, Address: `500 5th Ave, Floor 3, New York, NY, 10018`
4. Fill in **Administrator Doctor** (Root Doctor):
   - First Name: `John`, Middle Name: `A`, Last Name: `Smith`
   - Email: `john.smith@cobpt.com`
   - Account Name: `john.smith`
   - User Type: `Doctor`
   - NPI: `1112223334`
   - License: `PT-NY-00123`
5. Review the **Summary** screen showing organization, clinics, and administrator details.
6. Click **Confirm** to submit.
7. **Expected Result:** Organization is created. Administrator doctor account is created in a pending state (awaiting signature activation).

---

## Scenario 2: Create Doctors and Activate Accounts via Signature

**Goal:** Add new doctors to the organization and walk through the signature-based account activation flow.

### 2A - Create a New Doctor

1. Log in as the **Administrator**.
2. Navigate to **Administration > Users**.
3. Click **Create User**.
4. Fill in doctor details:
   - First Name: `Sarah`, Last Name: `Johnson`
   - Email: `sarah.johnson@cobpt.com`
   - Role: `Doctor`
   - Specialty: `Physical Therapy`
   - NPI: `5556667778`
   - License: `PT-NY-00456`
   - Credential: `DPT`
   - Assign to clinic(s): `COB Downtown Clinic`
5. Click **Save**.
6. **Expected Result:** Doctor account is created in a **pending** state. The doctor receives an activation email with a signature link.

### 2B - Activate Account via Signature Ceremony

1. Doctor opens the activation link from their email (contains a unique token).
2. **Step 1 - Welcome:** System validates the token and displays doctor information (name, email, phone).
3. Read and acknowledge the **Consent Agreement** by checking the consent checkbox.
4. Click **Continue** - system sends an **OTP** verification code to the doctor's phone.
5. **Step 2 - OTP Verification:** Enter the OTP code received via SMS (phone displayed as masked: `***-***-1234`).
6. **Step 3 - Signature Capture:** Doctor provides their signature using one of three methods:
   - **Draw** - Sign directly on the signature pad
   - **Type** - Type name and select a font style
   - **Upload** - Upload a signature image (PNG/JPEG/SVG, max 5 MB)
7. **Step 4 - Review:** Preview the captured signature and confirm.
8. Click **Submit**.
9. **Step 5 - Success:** Signature is stored. Account status changes from **Pending** to **Active**.
10. **Expected Result:** Doctor can now log in to the EMR system.

---

## Scenario 3: Login with Doctor

**Goal:** Demonstrate the doctor login flow and clinic selection.

### Steps

1. Navigate to the EMR login page.
2. Enter credentials:
   - Username: `sarah.johnson`
   - Password: `********`
3. Keycloak authentication processes the login.
4. System loads the doctor's profile and assigned clinics.
5. If the doctor is assigned to multiple clinics, select the active clinic (e.g., `COB Downtown Clinic`).
6. **Expected Result:** Doctor lands on the **Dashboard** with the selected clinic context. The clinic selector is visible in the header for switching between clinics.

### Edge Case - Inactive Account Login

1. Attempt to log in with a doctor whose signature has **not** been submitted.
2. **Expected Result:** System redirects to the **"Account Pending Activation"** page with a message indicating signature is required. A **Logout** button is available.

---

## Scenario 3.1: What a Doctor Can Do After Login (Full Capability Overview)

**Goal:** Walkthrough every feature available to a logged-in doctor to showcase the system's full breadth.

### A. Header Bar and Global Controls

| Element                | What It Does                                                                                           |
|------------------------|--------------------------------------------------------------------------------------------------------|
| **Clinic Selector**    | Dropdown showing all clinics assigned to the doctor. Switching clinics re-filters patients, appointments, calendars, and co-sign docs to the selected clinic context. |
| **Patient Search**     | Quick search bar in the header. Type a patient name and press Enter to jump to the filtered patient list. |
| **User Initials Badge**| Displays the doctor's initials (e.g., `SJ` for Sarah Johnson) and full name.                          |
| **Theme Toggle**       | Switch between Light and Dark mode.                                                                    |
| **Logout**             | Ends the Keycloak session and returns to the login page.                                               |

**Demo Steps:**
1. Point out the clinic selector showing `COB Downtown Clinic` and `COB Midtown Clinic`.
2. Switch from `COB Downtown Clinic` to `COB Midtown Clinic` - observe the patient list and scheduler update.
3. Use the search bar to search for a patient by name.

---

### B. Side Navigation Menu (Doctor Role)

The sidebar adapts based on the doctor's assigned roles. A clinical doctor typically sees:

| Menu Item              | Sub-Items                                                          | Description                                                         |
|------------------------|--------------------------------------------------------------------|---------------------------------------------------------------------|
| **Dashboard**          | -                                                                  | Landing page after login                                            |
| **Patient**            | Patients (list)                                                    | Search, create, view, and edit patient records                      |
| **Scheduler**          | View Scheduler, Scheduler Settings, Manage Calendars, Scheduler History | Full appointment management                                |
| **Users**              | Create User, Clinical Users, Clerical Users                       | Manage clinical and clerical staff                                  |
| **Clinics**            | View Clinics                                                       | View clinic information                                             |
| **Insurance Company**  | View Companies                                                     | Manage insurance company records                                    |
| **Referring Provider** | Referring Providers                                                | Manage referring provider records                                   |

**Demo Steps:**
1. Walk through each sidebar menu item to show all available sections.
2. Highlight that the menu is role-based - admin users see Organization management instead of Dashboard.

---

### C. Dashboard

1. After login, doctor lands on the **Dashboard**.
2. The dashboard provides a quick overview of the doctor's clinic context.
3. **Demo:** Show the Dashboard briefly as the home base before navigating to other sections.

---

### D. Patient Management

#### D1 - Patient List

1. Navigate to **Patient > Patients**.
2. The list shows all patients belonging to the currently selected clinic.
3. Demonstrate:
   - **Search/Filter** patients by name
   - Click a patient to open their **Patient Chart**

#### D2 - Create a New Patient

1. Click **Create Patient** (requires `modify` scope on `emr-patient-role`).
2. Fill in demographics: Name, DOB, Gender, Marital Status, Phone, Address.
3. Add Emergency Contact, Dependent, and Insurance information.
4. Save the patient.
5. **Expected Result:** Patient appears in the patient list.

#### D3 - Edit a Patient

1. From the patient list, navigate to a patient and click **Edit**.
2. Update contact information or address.
3. Save changes.

#### D4 - Patient Chart (Full Walkthrough)

Opening a patient's chart reveals comprehensive patient information:

**Patient Header Info:**
- Full Name, Date of Birth, Age, Gender
- Email, Phone, Address (expandable, with copy-to-clipboard)
- Primary Insurance, EMR ID, Patient Status

**Chart Tabs:**

| Tab             | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **Cases**       | All treatment cases for this patient (sorted by order). Select a case to see its details and records. |
| **Upcoming Appointments** | Future scheduled appointments for this patient.                |
| **Previous Appointments** | Past appointment history.                                      |
| **Payments**    | Patient payment records.                                                    |

**Demo Steps:**
1. Open patient `Michael Davis`.
2. Show the patient header info at the top.
3. Walk through each tab: Cases, Upcoming Appointments, Previous Appointments, Payments.

---

### E. Patient Case Detail (Within Chart)

When a case is selected in the chart, the case detail panel shows:

#### E1 - Case Information Header
- Case Title, Treating Doctor, Referring Doctor (with NPI)
- ICD-10 Diagnosis codes listed
- Authorization Data with expiration status (shows **Expired** badge if past end date)
- Additional Info section

#### E2 - Case Sections

| Section             | Description                                                                                    |
|---------------------|------------------------------------------------------------------------------------------------|
| **Records**         | All medical note records (Initial Exam, Daily Notes, Progress Notes, Discharge) with actions.  |
| **Authorization**   | Case authorization data and status.                                                            |
| **E-Documents**     | Upload, view, edit, download, and delete electronic documents attached to the case.            |
| **Chart Note**      | Free-text note attached to the case for quick doctor annotations.                              |

#### E3 - Medical Note Actions (Smart Workflow Rules)

The system enforces a clinical workflow for note creation:

| Condition                                   | Allowed Actions                                                        |
|---------------------------------------------|------------------------------------------------------------------------|
| No notes exist yet                          | **Initial Examination** only                                           |
| Initial Examination exists                  | Daily Note, Progress Note, Quick Discharge, Discharge                  |
| Patient is discharged (any discharge type)  | **No further notes** can be created                                    |
| Initial Examination already created         | Cannot create another Initial Examination (one per case)               |

**Demo Steps:**
1. Open a case with no notes - show only "Initial Examination" is available.
2. After creating an Initial Exam, show that Daily Note, Progress Note, Quick Discharge, and Discharge become available.
3. Explain that the system prevents out-of-order note creation.

#### E4 - Record Line Actions

Each record in the Records list supports the following actions (based on role):

| Action        | Who Can Do It     | Description                                                 |
|---------------|-------------------|-------------------------------------------------------------|
| **Complete**  | Clinical Users    | Re-open a draft note to continue editing or finalize it     |
| **View PDF**  | All Users         | Export and download the note as a PDF                       |
| **Remove**    | Clinical Users    | Delete a draft note                                         |
| **View Reason**| All Users        | View cancel/no-show reason for appointment-related records  |

**Demo Steps:**
1. Show a list of records under a case.
2. Click **View PDF** to download a finalized note as PDF.
3. Click **Complete** on a draft note to re-open it for editing.

---

### F. E-Documents Management

#### F1 - Upload a Document

1. Within a patient case, navigate to the **E-Documents** section.
2. Click **Upload Document**.
3. Fill in:
   - **Document Type** (choose from: Blood Work Results/Labs, Driver's License, HEP, Insurance Card, Medication Listing, MRI, Past Medical History, Patient Intake, Physician's Notes, Plan of Care, Script, XRay, Other)
   - **Name of Document**: e.g., `MRI Report - Lumbar Spine`
   - **Date of Receipt**: select date
   - **Assigned Case**: Current Case or All Cases
   - **File**: Upload the document file
4. Click **Submit**.
5. **Expected Result:** Document appears in the E-Documents list.

#### F2 - View, Edit, Download, Delete Documents

1. **View**: Click a document to preview it inline (supports images and PDFs).
2. **Edit**: Update document metadata (type, name, date, assigned case).
3. **Download**: Download the original file.
4. **Delete**: Remove the document from the case.

**Demo Steps:**
1. Upload a sample MRI document.
2. Preview it inline.
3. Edit the document type.
4. Download it.

---

### G. Chart Note

1. Within a patient case, navigate to the **Chart Note** section.
2. Type a free-text note (e.g., `Patient reports improvement in lower back pain after 3 sessions.`).
3. Click **Save Chart Note**.
4. **Expected Result:** Toast notification confirms save. Note persists on the case.
5. **Clear** button removes the text.

---

### H. Scheduler (Appointment Management)

#### H1 - View Scheduler (Calendar)

1. Navigate to **Scheduler > View Scheduler**.
2. The calendar displays in **Week view** by default (also supports Day and Month views).
3. The calendar shows appointments color-coded per calendar, filtered by the selected clinic.
4. **Calendar Selection:** Toggle which calendars (therapists/rooms) to show using checkboxes. User preferences are saved.
5. **Status Filters:** Toggle showing **Cancelled** and **No-Show** appointments.

**Demo Steps:**
1. Show the Week view with appointments.
2. Switch to Day view and Month view.
3. Toggle calendars on/off.
4. Toggle showing cancelled appointments.

#### H2 - Create an Appointment

1. Click on a time slot in the calendar (Day or Week view).
2. The **Add Appointment** modal opens with:
   - **Patient**: Select from the patient list
   - **Patient Case**: Auto-selects the first case (or choose from dropdown)
   - **Clinic**: Auto-selected based on patient and current clinic
   - **Therapist**: Select the treating therapist
   - **Appointment Type**: Select from configured types
   - **Calendar**: Select target calendar
   - **Start Date/Time** and **End Date/Time** (end time auto-calculated based on scheduler interval settings)
   - **Repetition**: Optional - configure recurring appointments:
     - Daily, Weekly, Monthly, or Yearly
3. Click **Save**.
4. **Expected Result:** Appointment appears on the calendar. Toast: "Appointment created Successfully".

#### H3 - Edit an Appointment

1. Click on an existing appointment in the calendar.
2. From the **Action Menu**, select **Edit**.
3. Modify appointment details (time, therapist, type, etc.).
4. Save changes.
5. **Expected Result:** Appointment updates on the calendar.

#### H4 - Drag & Drop Reschedule

1. Drag an appointment from one time slot to another in Week or Day view.
2. System validates the new time is within scheduler boundaries.
3. **Expected Result:** Appointment is rescheduled to the new time.

#### H5 - Appointment Status Updates

1. Click on an appointment > **Action Menu** > **Status**.
2. Available statuses: `Created` > `Confirmed` > `Check-In` > `Check-Out`
3. Can also mark as **Cancel** (with reason and date) or **No-Show** (with reason).

#### H6 - Delete an Appointment

1. Click on an appointment > **Action Menu** > **Delete**.
2. Confirm deletion.
3. **Expected Result:** Appointment is removed from the calendar.

#### H7 - View Appointment History

1. Click on an appointment > **Action Menu** > **History**.
2. System navigates to **Scheduler History** showing the audit trail for that appointment.

#### H8 - Scheduler Settings

1. Navigate to **Scheduler > Scheduler Settings**.
2. Configure:
   - **Date Settings**: Working hours, appointment interval (e.g., 30 min, 45 min, 60 min)
   - **Appointment Types**: Create and manage appointment types (name, duration, color)
   - **Cancellation Fee**: Configure cancellation fee policies

#### H9 - Manage Calendars

1. Navigate to **Scheduler > Manage Calendars**.
2. Create, edit, or view calendars (each calendar represents a therapist room or resource).

---

### I. Users Management

1. Navigate to **Users**.
2. **Create User**: Add new clinical or clerical staff.
3. **Clinical Users**: View/manage doctors and therapists.
4. **Clerical Users**: View/manage front desk and administrative staff.

**Demo Steps:**
1. Show the Clinical Users list.
2. Show the Clerical Users list.
3. Show the Create User form briefly.

---

### J. Clinics Management

1. Navigate to **Clinics > View Clinics**.
2. View all clinics in the organization with their addresses and details.

---

### K. Insurance Company Management

1. Navigate to **Insurance Company > View Companies**.
2. View all configured insurance companies.
3. Add or manage insurance company records.

---

### L. Referring Provider Management

1. Navigate to **Referring Provider > Referring Providers**.
2. View all referring providers (doctors who refer patients to this practice).
3. Add or manage referring provider records (name, NPI, specialty).

---

### M. Incoming Co-Sign Documents

1. Navigate to **Incoming Co-Sign Documents** (accessible from side menu or dedicated route).
2. View all medical notes that have been forwarded to the logged-in doctor for co-signature.
3. List is filtered by the currently selected clinic.
4. Click a document to navigate to the **Co-Sign Review** page.
5. Review the note content and co-sign/finalize.

**Demo Steps:**
1. Show the Incoming Co-Sign Documents list with pending items.
2. Click one to show the review page.
3. Demonstrate the co-sign flow.

---

### Summary: Doctor Capabilities at a Glance

| Category                | Capabilities                                                                                       |
|-------------------------|----------------------------------------------------------------------------------------------------|
| **Global**              | Clinic switching, patient search, theme toggle, logout                                             |
| **Patient Management**  | List, create, edit, search patients                                                                |
| **Patient Chart**       | View demographics, cases, appointments (upcoming/previous), payments                               |
| **Case Management**     | View case details, diagnosis, authorization, referring provider                                     |
| **Medical Notes**       | Create (IE, Daily, Progress, Discharge, Quick Discharge), draft, edit, finalize, forward, view PDF, remove |
| **E-Documents**         | Upload, view/preview, edit metadata, download, delete case documents                               |
| **Chart Notes**         | Free-text annotations per case                                                                     |
| **Scheduler**           | View calendar (Day/Week/Month), create/edit/delete/drag appointments, status updates, recurring appointments |
| **Scheduler Admin**     | Settings, appointment types, cancellation fees, calendar management, history                        |
| **Users**               | Create users, view clinical and clerical staff                                                     |
| **Clinics**             | View clinic information                                                                            |
| **Insurance**           | View and manage insurance companies                                                                |
| **Referring Providers** | View and manage referring providers                                                                |
| **Co-Sign Documents**   | Review and co-sign forwarded medical notes                                                         |

---

## Scenario 4: Create Patient and Patient Case

**Goal:** Register a new patient and create a treatment case.

### 4A - Create Patient

1. Navigate to **Patients** section.
2. Click **Create Patient**.
3. Fill in patient demographics:
   - First Name: `Michael`, Last Name: `Davis`
   - Date of Birth: `1985-03-15`
   - Gender: `Male`
   - Marital Status: `Married`
   - Phone: `(212) 555-0199`, Phone Type: `Mobile`
   - Address: `250 Park Ave, Apt 4B, New York, NY, 10017`
4. Add **Emergency Contact** information.
5. Add **Insurance** information:
   - Insurance Company, Policy Number, Group Number
   - Subscriber details (if different from patient)
6. Click **Save**.
7. **Expected Result:** Patient record is created and appears in the patient list.

### 4B - Create Patient Case

1. Open patient `Michael Davis` from the patient list.
2. Navigate to the **Cases** tab.
3. Click **Create New Case**.
4. Fill in case details:
   - Case Title: `Lower Back Pain - MVA`
   - Place of Service: select appropriate value
   - Injury Case: select injury type (e.g., `Auto Accident`)
   - Treating Doctor: `Dr. Sarah Johnson`
5. Add **Diagnosis** (ICD-10 codes):
   - Search and select: `M54.5 - Low back pain`
   - Add secondary: `M51.16 - Intervertebral disc degeneration, lumbar region`
6. Add **Referral** information (referring provider details).
7. Add **Insurance** information linked to the case.
8. Add **Authorization Data** if applicable.
9. Click **Save**.
10. **Expected Result:** Patient case is created and linked to the patient. The case is now available for creating medical notes.

---

## Scenario 5: Medical Notes - Complete Deep Dive

**Goal:** Demonstrate the full medical note lifecycle - from creation through every SOAP section, drafting, editing, finalizing, forwarding, and co-signing. This is the core clinical documentation engine of the EMR.

---

### 5.1 Note Types Overview

The system supports **5 medical note types**, each serving a specific clinical purpose:

| Note Type                | Purpose                                                       | When Used                          |
|--------------------------|---------------------------------------------------------------|------------------------------------|
| **Initial Examination**  | Comprehensive first-visit evaluation with full SOAP + Billing | Patient's first therapy session    |
| **Daily Note**           | Regular treatment session documentation                       | Each subsequent visit              |
| **Progress Note**        | Periodic re-evaluation of patient progress                    | Every 10th visit or insurance requirement |
| **Discharge Note**       | Full discharge summary with outcomes                          | When treatment plan concludes      |
| **Quick Discharge Note** | Abbreviated discharge (date, visits, comment only)            | Simple/fast discharge              |

---

### 5.2 Clinical Workflow Rules (Smart Note Sequencing)

The system enforces a strict clinical documentation workflow:

```
New Case (no notes)
  --> Only "Initial Examination" can be created

After Initial Examination exists
  --> Daily Note, Progress Note, Quick Discharge, Discharge become available
  --> Initial Examination is locked (only 1 per case)

After any Discharge type is finalized
  --> NO further notes can be created (case is closed)
```

**Demo Steps:**
1. Open a case with no notes - show only **Initial Examination** button available.
2. Create an Initial Exam - show the other note types now become available.
3. Open a discharged case - show that all note creation buttons are disabled.

---

### 5.3 Note Structure: SOAP + Billing (Stepper Wizard)

Every medical note (except Quick Discharge) is built using a **multi-step stepper wizard** with these major sections:

```
Step 1: SUBJECTIVE  -->  Step 2: OBJECTIVE  -->  Step 3: ASSESSMENT  -->  Step 4: PLAN  -->  Step 5: BILLING
```

Each step can be saved as a draft independently. The doctor can navigate back and forth between steps.

---

### 5.4 Creating an Initial Examination Note

1. Open patient `Michael Davis` > select case `Lower Back Pain - MVA`.
2. Click the **Initial Examination** action button.
3. System creates the note with:
   - Encounter date: today
   - Provider: logged-in doctor (name, NPI, credential, license, specialty)
   - Case diagnosis codes auto-populated from the case's ICD-10 codes
4. The **Stepper Wizard** opens at Step 1.

---

### 5.5 Step 1: SUBJECTIVE Section (Detailed)

The Subjective section captures the patient's self-reported information. It contains **6 sub-sections**:

#### A. Basic Information

| Field                                    | Type           | Description                                                        |
|------------------------------------------|----------------|--------------------------------------------------------------------|
| **DOS Date**                             | Date           | Date of Service                                                    |
| **Time In / Time Out**                   | Time           | Session start and end time (toggle to enable)                      |
| **Number of Visit**                      | Number         | Visit number in the treatment plan                                 |
| **ICD-10 Diagnosis**                     | Search + List  | Search ICD-10 codes by keyword, add multiple diagnoses             |
| **Treatment Diagnosis**                  | Search + List  | Treatment-specific diagnosis codes                                 |
| **Treatment Side**                       | Multi-select   | Left, Right, Bilateral                                             |
| **Specific Physician Orders**            | Toggle + Text  | Free text if enabled                                               |
| **Injury/Onset Date**                    | Date           | When the injury occurred                                           |
| **Chronic / Insidious / New Injury**     | Checkboxes     | Nature of condition (New Injury has text detail)                    |
| **Surgery Performed**                    | Toggle         | If yes: Date of Surgery, Type of Surgery                           |
| **Prior Hospitalization**                | Toggle         | If yes: From Date, To Date                                        |
| **Pelvic/Speech Profile**                | Select         | Specialty profile selection                                        |
| **History of Present Condition / Mechanism of Injury** | Text Area | Narrative description of how the injury happened    |
| **Primary Concern / Chief Complaint**    | Text Area      | Patient's main reason for seeking treatment                        |
| **Current Complaints / Gains**           | Text Area      | What the patient is currently experiencing                         |

**Demo Steps:**
1. Fill in DOS date and visit number.
2. Search for ICD-10 code `M54.5` (Low back pain) and add it.
3. Set treatment side to `Bilateral`.
4. Enter the mechanism of injury narrative.
5. Type the chief complaint: "Lower back pain radiating to left leg, difficulty sitting for extended periods."

#### B. Pain Evaluation

| Field                                   | Type           | Description                                                          |
|-----------------------------------------|----------------|----------------------------------------------------------------------|
| **Pain Scale**                          | Toggle         | Enable pain evaluation                                               |
| **Pain Evaluations** (multi-entry)      | Repeatable     | For each pain location:                                              |
|   - Location                            | Text           | Body area (e.g., "Lower Back", "Left Leg")                          |
|   - Worst                               | Scale 0-10     | Worst pain level                                                     |
|   - Current                             | Scale 0-10     | Current pain level                                                   |
|   - Best                                | Scale 0-10     | Best pain level                                                      |
|   - Description                         | Text           | Quality of pain (sharp, dull, burning, etc.)                         |
|   - Plan                                | Text           | Pain management plan                                                 |
| **Aggravating Factors**                 | Multi-select   | What makes pain worse                                                |
| **Restrictions / Pain Alleviators**     | Toggle + Text  | What relieves the pain                                               |

**Demo Steps:**
1. Enable Pain Scale.
2. Add pain location "Lower Back": Worst: 8, Current: 6, Best: 3, Description: "Sharp, radiating".
3. Add pain location "Left Leg": Worst: 6, Current: 4, Best: 1, Description: "Numbness and tingling".
4. Select aggravating factors.

#### C. Medical History

A comprehensive medical history section with these sub-areas:

| Sub-Area                                | Fields                                                                        |
|-----------------------------------------|-------------------------------------------------------------------------------|
| **Previous History of Similar Symptoms**| Episodes count, year of first episode, previous treatments, narrative         |
| **General Health**                      | Overall health status                                                        |
| **Occupation / Social History**         | Work status, duty level, occupation name, out-of-work dates, home layout, durable medical equipment, tobacco use + cessation counseling |
| **Home Health Care**                    | Toggle + details                                                              |
| **History of Falls**                    | Toggle + documentation, risk assessment (medications, home hazards, postural BP, vision) |
| **Medical History Review**              | Checklist with notes for each condition:                                      |
|                                         | Alzheimer's, Cardiovascular Disease, Cauda Equina Syndrome, CVA, Current Infection, Diabetes Type 1 & 2, Fibromyalgia, Fracture, High Blood Pressure, Cancer History, Huntington's, Immunosuppression, Lupus, Muscular Dystrophy, Obesity, Osteoarthritis, Parkinson's, Rheumatoid Arthritis, Traumatic Brain Injury, Other |
| **Complicating/Personal Factors**       | Checklist: Allergies, Attitudes/Motivation, Character, Coping Style, Education Level, Home Environment, Lifestyle, Litigation, Mechanism of Injury, Multiple Treatment Areas, Patient Age, Previous Therapy, Psycho-Social, Rehab Potential, Social Background, Surgical History, Time Since Onset, Other |
| **Current Medications**                 | Prescription, Over-the-Counter, Herbals, Vitamin/Mineral/Dietary Supplements, Other, Not Currently Taking |
| **Mental Status / Cognitive Function**  | Toggle if appears impaired + details                                          |
| **Unexplained Weight Loss**             | Toggle                                                                       |
| **Diagnostic Testing / Imaging**        | Text area for MRI, X-ray, Lab results                                        |
| **Patient Goals**                       | Text area for patient-stated goals                                           |

**Demo Steps:**
1. Mark "Previous History of Similar Symptoms" as Yes.
2. Check "High Blood Pressure" in the medical history review and add note: "Controlled with medication".
3. Enter current medications: Prescription - "Ibuprofen 600mg as needed".
4. Enter patient goals: "Return to work without back pain, resume jogging."

#### D. Current Functional Limitations

Organized into **4 functional domains**, each with detailed sub-categories:

| Domain                                      | Sub-Categories                                                              |
|---------------------------------------------|-----------------------------------------------------------------------------|
| **Self Care**                               | Bathing, Dressing, Grooming, Hygiene, Toileting, Sleep/Sleeping Postures, Household Chores, Looking After Health, Use of Assistive Device, Surface |
| **Mobility / Walking / Moving Around**      | Walking, Walking Between Rooms, Walking Down the Street, Moving Around, Moving Around in Different Locations, Moving Around Using Equipment, Moving Around Using Transportation, Negotiate Obstacles, IADLs |
| **Changing / Maintaining Body Position**    | Maintaining a Body Position, Transfers, IADLs                               |
| **Carrying / Moving / Handling Objects**    | Fine Hand Use, Hand & Arm Use, Moving Objects with Lower Extremities, IADLs, Recreation |

Each item has an **independence level** (Independent, Modified Independent, Supervision, Min Assist, Mod Assist, Max Assist, Dependent, Unable) with optional comment per domain.

Additional specialty fields: Lymphedema, Wound Healing, Pelvic Health.

**Demo Steps:**
1. Under Self Care, mark "Dressing" as "Modified Independent".
2. Under Mobility, mark "Walking Down the Street" as "Min Assist".
3. Add a comment: "Patient requires assistive device for distances > 200 ft."

#### E. Prior Level of Function

Same **4 functional domains** as Current Function (Self Care, Mobility, Changing Body Position, Carrying/Handling Objects) but documenting the patient's **baseline BEFORE injury**. This allows comparison between prior and current functional status.

**Demo Steps:**
1. Mark all Self Care items as "Independent" (patient was fully functional before injury).
2. Mark Mobility items as "Independent".

#### F. Navigate to Step 2

1. Click **Next** (or click Step 2 in the stepper header) to proceed to the Objective section.

---

### 5.6 Step 2: OBJECTIVE Section (Detailed)

The Objective section captures clinician-measured findings. Contains **9 sub-sections** selected via a profile dropdown:

#### A. Objective Profile

Select a **body region profile** to pre-configure which objective tests are relevant (e.g., Cervical, Shoulder, Lumbar, Knee, Hand/Wrist, etc.). This controls which sub-sections and fields are displayed.

#### B. Inspection

| Sub-Section                        | Fields                                                                                   |
|------------------------------------|------------------------------------------------------------------------------------------|
| **Inspection**                     | General inspection notes (text)                                                          |
| **Patient Consent**                | Consent documented                                                                       |
| **Chaperone**                      | Chaperone present (yes/no, details)                                                      |
| **Girth Measurement - Upper**      | Circumferential measurements for upper extremity joints (Right/Left)                     |
| **Girth Measurement - Lower**      | Circumferential measurements for lower extremity joints (Right/Left)                     |
| **Post-Operative Wound Healing**   | Wound healing status and details                                                         |
| **Wound Care**                     | Wound type, size, drainage, tissue type, treatment                                       |
| **Surgical Scarring**              | Scar type, mobility, adhesion status                                                     |
| **Body Mass Index**                | Height, Weight, BMI calculation                                                          |
| **Additional Comments**            | Free text                                                                                |

#### C. Observation

| Sub-Section                        | Description                                                                               |
|------------------------------------|-------------------------------------------------------------------------------------------|
| **Indicate Body Type**             | Ectomorph, Mesomorph, Endomorph                                                           |
| **Vitals**                         | Blood pressure, heart rate, respiratory rate, temperature, O2 saturation                  |
| **ADL Management**                 | Activities of daily living assessment                                                     |
| **Breathing at Rest**              | Respiratory pattern observations                                                          |
| **Transfers**                      | Transfer ability assessment (bed, chair, toilet, car, floor)                              |
| **Cast/Splint**                    | Presence and type of cast or splint                                                       |
| **Standing Posture**               | Head, cervical, thoracic, lumbar, pelvis alignment                                        |
| **Protracted Scapulas**            | Scapular positioning                                                                      |
| **Scoliosis**                      | Spinal curvature observation                                                              |
| **Lower Extremity Structure**      | Genu varum/valgum, foot alignment                                                        |
| **Gait**                           | Gait pattern, deviations, cadence, stride length, assistive device use                    |
| **Six-Minute Walk Test**           | Distance, vitals pre/post, Borg scale                                                    |
| **Assistive Device**               | Type of device (walker, cane, crutches, wheelchair)                                       |
| **Immobilizer**                    | Type and location                                                                         |
| **Muscular Asymmetries**           | Visual asymmetry findings                                                                 |
| **Muscle Guarding**                | Presence and location of guarding                                                         |
| **Muscle Atrophy**                 | Presence and location of atrophy                                                          |
| **Edema**                          | Location, severity, type (pitting/non-pitting)                                            |
| **Apprehension of Movement**       | Movement fear/avoidance behaviors                                                         |
| **Additional Comments**            | Free text                                                                                 |

**Demo Steps:**
1. Record vitals: BP 130/85, HR 72, RR 16.
2. Note standing posture: forward head, increased lumbar lordosis.
3. Gait: antalgic gait, decreased stride length on left.

#### D. Outcome Measurement Tools (OMT)

Standardized validated tests organized by body region:

| Category                    | Tests                                                                                |
|-----------------------------|--------------------------------------------------------------------------------------|
| **Upper Extremity**         | DASH, QuickDASH, Upper Extremity Functional Index, etc.                              |
| **Spine**                   | Oswestry Disability Index, Neck Disability Index, Roland-Morris, etc.                |
| **Lower Extremity**         | LEFS, KOOS, WOMAC, etc.                                                              |
| **Balance**                 | Berg Balance Scale, Timed Up and Go, Dynamic Gait Index, etc.                        |
| **Pain**                    | Visual Analog Scale, McGill Pain Questionnaire, etc.                                 |
| **Vestibular**              | Dizziness Handicap Inventory, Motion Sensitivity Quotient, etc.                      |
| **Dizziness Handicap Inventory** | 25-item questionnaire with scoring                                              |
| **Lymphedema**              | Limb volume measurements, staging                                                    |
| **Pelvic**                  | Pelvic floor function assessments                                                    |
| **General Function**        | SF-36, Patient-Specific Functional Scale, etc.                                       |
| **Custom OMT**              | User-defined outcome measurement tools                                               |

**Demo Steps:**
1. Open the Oswestry Disability Index under Spine.
2. Score the test with the patient's responses.
3. Show the calculated score and interpretation.

#### E. Range of Motion (AROM / PROM)

Comprehensive joint-by-joint range of motion measurements:

| Region        | Joints & Movements                                                                          |
|---------------|---------------------------------------------------------------------------------------------|
| **Cervical**  | Flexion, Extension, Lateral Flexion (R/L), Rotation (R/L) - AROM                            |
| **Shoulder**  | Flexion, Extension, Abduction, Adduction, IR, ER, Horizontal Add/Abd - AROM + PROM          |
| **Elbow**     | Flexion, Extension, Supination, Pronation - AROM + PROM                                     |
| **Wrist**     | Flexion, Extension, Radial/Ulnar Deviation - AROM + PROM                                    |
| **Hand**      | MCP, PIP, DIP for each finger - AROM + PROM                                                 |
| **Thoracic**  | Flexion, Extension, Rotation, Lateral Flexion - Standing + Sitting with Passive Overpressure |
| **Lumbar**    | Flexion, Extension, Lateral Flexion (R/L), Rotation (R/L) - AROM                            |
| **Hip**       | Flexion, Extension, Abduction, Adduction, IR, ER - AROM + PROM                              |
| **Knee**      | Flexion, Extension - AROM + PROM                                                            |
| **Ankle**     | Dorsiflexion, Plantarflexion, Inversion, Eversion - AROM + PROM                             |
| **1st MTP**   | Flexion, Extension - AROM + PROM                                                            |
| **1st IP**    | Flexion, Extension - AROM + PROM                                                            |
| **Toes**      | MTP, PIP, DIP - AROM + PROM                                                                |
| **Costovertebral Expansion** | Toggle for chest expansion measurement                                        |

Each measurement records: Right value, Left value, End-feel (where applicable). A "No Limitations Noted" toggle is available to skip this section.

**Demo Steps:**
1. Record Lumbar AROM: Flexion 40/60, Extension 15/25, Lateral Flexion R 20/25, L 15/25.
2. Record Hip AROM: Flexion R 100/120, L 90/120.

#### F. Strength

| Sub-Section                           | Description                                                                        |
|---------------------------------------|------------------------------------------------------------------------------------|
| **No Limitations Noted**              | Toggle to skip if all strength is normal                                           |
| **Selective Tissue Tension - Upper**  | Upper extremity tissue tension testing (R/L)                                       |
| **Selective Tissue Tension - Lower**  | Lower extremity tissue tension testing (R/L)                                       |
| **Grip / Pinch**                      | Dynamometer readings for grip, lateral pinch, palmar pinch, tip pinch (R/L, 3 trials) |
| **Gross Muscle Tests - Upper**        | Shoulder, elbow, wrist, hand muscle groups (R/L, graded 0-5)                      |
| **Gross Muscle Tests - Trunk**        | Core and trunk muscle groups (graded 0-5)                                          |
| **Gross Muscle Tests - Lower**        | Hip, knee, ankle muscle groups (R/L, graded 0-5)                                  |
| **Gross Muscle Tests - Pelvic Floor** | Pelvic floor muscle grading                                                        |
| **Core Strength**                     | Core stability assessment                                                          |
| **Redcord/NEURAC Stability Tests**    | Upper and Lower body myofascial tests using suspension exercise                    |
| **Manual Muscle Tests (MMT)**         | Individual muscle testing (graded 0-5, R/L)                                        |
| **Additional Comments**               | Free text                                                                          |

**Demo Steps:**
1. Record Gross Muscle Test - Lower: Hip Flexion R 4/5, L 3+/5.
2. Record Grip strength: R 45 lbs, L 42 lbs (3 trials each).

#### G. Neuro-Vascular Assessment

One of the most comprehensive sections, covering:

| Sub-Section                    | Tests                                                                                   |
|--------------------------------|-----------------------------------------------------------------------------------------|
| **Radicular Symptoms**         | Complaints of radicular symptoms in either extremity                                    |
| **Extremity Reflexes**         | Equal/normal bilateral assessment                                                       |
| **Sensory/Vascular Deficits**  | Toggle + details                                                                        |
| **Cranial Nerve Screen**       | 12 cranial nerves: Smell (CN I), Confrontation (CN II), Convergence (CN III/IV/VI), Facial Sensation (CN V), Jaw Jerk (CN V), Smile/Frown (CN VII), Hall-Pike/Finger Rustle/Bone Conduction (CN VIII), Body Tilt (CN VIII Vest), Swallowing (CN IX), Uvula (CN X), Trapezius/SCM (CN XI), Tongue Protrusion (CN XII) |
| **Myotomes - Upper**           | C3 Lat Cervical Flexion, C4 Shoulder Elevation, C5 Shoulder Abduction, C6 Wrist Extension, C7 Triceps, C8 1st Extension, T1 Hand Intrinsics (R/L) |
| **Myotomes - Lower**           | L1-2 Iliopsoas, L3 Quadriceps, L4 Anterior Tibialis, L5 EHL, S1 Gastroc, S2 Hamstrings (R/L) |
| **Dermatomes - Upper**         | C4, C5, C6, C7, C8, T1 (R/L) - Intact/Diminished/Absent                               |
| **Dermatomes - Lower**         | L1-2, L3, L4, L5, S1, S2 (R/L)                                                        |
| **Upper Reflexes**             | Biceps (C5-6), Triceps (C7), Brachioradialis (C5-6) (R/L)                              |
| **Lower Reflexes**             | Knee Jerk (L4), Ankle Jerk (S1) (R/L)                                                  |
| **Neural Tissue Tension - Upper** | Median, Radial, Ulnar, Musculocutaneous, Axillary, Suprascapular nerves (R/L)       |
| **Neural Tissue Tension - Lower** | Sciatic, Common Peroneal, Tibial nerves (R/L)                                        |
| **Vascular**                   | Popliteal Artery, Pedal Pulse, Posterior Tibial Artery (R/L)                            |
| **Vertebral Artery**           | Extension, Right/Left Extension with Rotation                                           |
| **Allen's Test (Circulation)** | Radial/Ulnar artery (R/L)                                                              |
| **Capillary Refill**           | R/L                                                                                     |
| **Homan's Sign**               | R/L                                                                                     |
| **Thoracic Outlet**            | Adson's Test, Roos Test (R/L)                                                           |
| **Lasegue's SLR**              | R/L with comments                                                                       |
| **Slump Test**                 | R/L                                                                                     |
| **Quadrant Testing**           | R/L                                                                                     |
| **Prone Knee Bend (Nachlas)**  | R/L with comments                                                                       |
| **Kernig/Brudzinski Test**     | R/L                                                                                     |
| **Cram Test**                  | R/L                                                                                     |
| **Seated Dural Stretch**       | R/L with comments                                                                       |
| **Semmes-Weinstein - Lower**   | 1st-5th Toe, Plantar Surface, Dorsal Surface (R/L with monofilament values)             |
| **Semmes-Weinstein - Upper**   | Thumb, Index, Middle, Ring, Small finger (Radial/Ulnar sides, R/L)                      |
| **Tinel's Sign - Lower**       | Tarsal Tunnel, Fibular Head (R/L)                                                       |
| **Tinel's Sign - Upper**       | Volar Carpals (Median), Cubital Tunnel (Ulnar), Guyon's Canal (Ulnar) (R/L)            |
| **Transverse Ligament Stability** | Cervical ligament stability test                                                     |
| **Additional Comments**        | Free text                                                                                |

**Demo Steps:**
1. Mark "No radicular symptoms".
2. Record Myotomes Lower: all 5/5 bilaterally except L5 EHL R 4/5.
3. Record Dermatomes Lower: all intact except L5 Left diminished.
4. SLR: Positive Left at 45 degrees, Negative Right.

#### H. Special Tests

Extensive orthopedic special tests organized by region:

| Sub-Section                              | Tests                                                                         |
|------------------------------------------|-------------------------------------------------------------------------------|
| **Flexibility**                          | Hamstring, Quad, IT Band, Hip Flexor, Gastroc/Soleus, Pec, Lat, etc.         |
| **Structural**                           | Leg length discrepancy, scoliosis screen, etc.                               |
| **Ligament Integrity - Knee**            | ACL (Lachman, Anterior Drawer), PCL (Posterior Drawer), MCL, LCL (Varus/Valgus), Pivot Shift |
| **Stork Stand / SI Mobility Test**       | Sacroiliac joint assessment                                                   |
| **Patellofemoral**                       | Clarke's Test, Patellar Apprehension, Grind Test                              |
| **Functional Tests**                     | Single Leg Squat, Hop Test, Y-Balance, etc.                                  |
| **Alar Ligament Test / Stress**          | Upper cervical stability                                                      |
| **Work Conditioning**                    | Material Handling and Non-Material Handling work capacity tests               |
| **TMR FAB4 Worksheet**                   | Functional assessment battery                                                 |
| **Cervical Passive Vertebral Mobility**  | Segmental mobility C0-C7                                                      |
| **Passive Vertebral Mobility - Thoracic**| Segmental mobility T1-T12                                                     |
| **Cervical Quadrant / Comp-Dist**        | Cervical compression and distraction tests                                    |
| **Jaw Crepitus**                         | TMJ assessment                                                               |
| **Spurling's Maneuver**                  | Cervical nerve root compression                                               |
| **Subcranial Passive Vertebral Mobility**| C0-C2 mobility                                                               |
| **Passive Joint Mobility - Shoulder**    | Glenohumeral joint play                                                       |
| **SC Joint / AC Joint**                  | Sternoclavicular and Acromioclavicular joint tests                            |
| **Impingement**                          | Neer, Hawkins-Kennedy, Empty Can                                              |
| **GHJ Stability**                        | Glenohumeral joint stability tests                                            |
| **Labrum**                               | O'Brien's, Crank Test, etc.                                                  |
| **Rotator Cuff**                         | Drop Arm, Lag Signs, Resisted ER/IR                                           |
| **Speed's Test**                         | Biceps tendon assessment                                                      |
| **Ligament Integrity - Elbow**           | Varus/Valgus stress                                                           |
| **Ulnar Nerve Subluxation**              | Cubital tunnel assessment                                                     |
| **Kemp's Test**                          | Lumbar facet assessment                                                       |
| **SI Compression / Distraction**         | Sacroiliac joint provocation                                                  |
| **Leg Length**                            | True and apparent leg length                                                  |
| **Proprioception / Balance**             | Balance and proprioception testing                                            |
| **Pelvic Clock / Introitus Clock**       | Pelvic floor assessments                                                      |
| **Lasegue's SLR**                        | Straight leg raise with details                                               |
| **Additional Comments**                  | Free text                                                                     |

**Demo Steps:**
1. Perform Flexibility: Hamstring - Tight bilaterally (R 60, L 55 degrees).
2. Perform SLR: Positive Left at 45 degrees with reproduction of radicular symptoms.
3. Perform Kemp's Test: Positive Left.

#### I. Palpation

| Field                    | Description                                                         |
|--------------------------|---------------------------------------------------------------------|
| **Palpation Findings**   | Document tenderness, spasm, trigger points per body region (R/L)    |
| **Additional Comments**  | Free text for additional palpation observations                     |

**Demo Steps:**
1. Document tenderness at L4-L5 paraspinals bilaterally.
2. Note trigger point in left piriformis.

---

### 5.7 Step 3: ASSESSMENT Section (Detailed)

The Assessment section documents the clinician's clinical judgment:

| Field                                       | Type           | Description                                                        |
|---------------------------------------------|----------------|--------------------------------------------------------------------|
| **Assessment / Diagnosis**                  | Text Area      | Clinical diagnosis and assessment narrative                        |
| **Patient Clinical Presentation**           | Text Area      | Summary of how the patient presents                                |
| **Patient Education**                       | Text Area      | Education provided to the patient                                  |
| **Rehab Potential**                         | Select         | Good, Fair, Poor, Guarded                                          |
| **Contraindications to Therapy**            | Radio (Yes/No) | If Yes: shows consent toggle                                      |
| **Consent to Care**                         | Text Area      | Consent details if contraindications exist                         |
| **Patient Compliance / HEP**               | Toggle         | Patient compliance with Home Exercise Program                      |
| **Patient Consultation: Maintain or Resume**| Toggle + Text  | Advice to maintain/resume physical activity                        |
| **Patient Consultation: Against Bed Rest**  | Toggle + Text  | Advice against extended bed rest                                   |
| **Problems** (dynamic list)                 | Add/Edit/Remove| Identified problems (e.g., "Decreased lumbar ROM", "L5 radiculopathy") |
| **Goals** (dynamic list)                    | Add/Edit/Remove| Each goal has:                                                     |
|   - Description                             | Text           | Goal statement                                                     |
|   - Term                                    | Select         | Short Term / Long Term                                             |
|   - Period                                  | Select         | 1 Visit, 2 Visits, 4 Visits, 6 Visits, 8 Visits, 10 Visits, 12 Visits, Custom |
|   - Met                                     | Select         | N/A, Met, Partially Met, Not Met, Discontinued, Modified           |

**Demo Steps:**
1. Enter Assessment Diagnosis: "Patient presents with acute L4-L5 disc herniation with left L5 radiculopathy."
2. Set Rehab Potential to "Good".
3. Add Problem: "Decreased lumbar AROM: Flexion 40/60, Extension 15/25".
4. Add Problem: "Left L5 radiculopathy with diminished sensation".
5. Add Short-Term Goal: "Increase lumbar flexion to 50 degrees within 4 visits" - Term: Short Term, Period: 4 Visits, Met: N/A.
6. Add Long-Term Goal: "Return to full work duties without pain within 12 visits" - Term: Long Term, Period: 12 Visits, Met: N/A.

---

### 5.8 Step 4: PLAN Section (Detailed)

The Plan section differs based on note type:

#### For Initial Examination and Progress Note: Full Plan of Care

| Field                      | Type           | Description                                                         |
|----------------------------|----------------|---------------------------------------------------------------------|
| **Create Plan of Care**    | Toggle         | Enable plan of care documentation                                   |
| **Frequency**              | Text           | Treatment frequency (e.g., "3x/week")                              |
| **Duration**               | Text           | Treatment duration (e.g., "8 weeks")                                |
| **Plan**                   | Text Area      | Narrative plan description                                          |
| **Physician Signature**    | Toggle         | Physician signature required                                        |

##### Procedures (21 procedure types)

| Procedure                          | Sub-Options                                                                          |
|------------------------------------|--------------------------------------------------------------------------------------|
| **Therapeutic Exercises**          | ROM, Strength, Endurance, Stability                                                  |
| **Therapeutic Activity**           | Work-Specific, Sport-Specific, Transfers, Bed Mobility, ADL-Specific                 |
| **Gait Training**                  | 4-Point Walker, Front Wheel Walker, 4-Wheel Walker, Hemi Walker, Quad Cane, 1-Point Cane, Axillary/Forearm Crutches, Even/Uneven Surfaces, Stairs, Curbs |
| **Neuromuscular Rehabilitation**   | Balance/Proprioception Training, Muscle Re-Education, Sequencing, Coordination, PNF, Redcord NEURAC |
| **Manual Therapy**                 | Soft Tissue Mobilization, Joint Mobilization, Spinal Mobilization, Manual Traction, Myofascial Release, Muscle Energy Techniques, Patellar Mobs, Cranio-Sacral, Visceral Manipulation, Dry Needling, Graston/ASTYM, Strain-Counterstrain |
| **Massage**                        | Type selection, Manual Lymphatic Drainage                                            |
| **Aquatic Therapy**                | Pool-based therapeutic exercises                                                     |
| **Splinting / Taping**             | Taping method selection                                                              |
| **Canalith Repositioning**         | Vestibular treatment                                                                 |
| **Wound Care / Debridement**       | Wound treatment procedures                                                           |
| **Iontophoresis**                  | Dexamethasone, Lidocaine, Marcaine, Acetic Acid, Iodine                              |
| **Group Therapy**                  | Group treatment sessions                                                             |
| **Lymphedema**                     | Lymphedema management                                                                |
| **Cardiac Rehabilitation**         | Cardiac rehab program                                                                |
| **Vestibular Rehabilitation**      | Vestibular rehab exercises                                                           |
| **Patient Education**              | Home Exercise Program, Postural Training, Ergonomics, Lifting Mechanics, TENS Use, Activity Modification, Home Safety |
| **Self Care**                      | Self-care training                                                                   |
| **Cognition**                      | Cognitive rehabilitation                                                             |
| **Remote Therapeutic Monitoring**  | Telehealth/remote monitoring                                                         |
| **Positional Nystagmus Test**      | Minimum 4 positions with recording                                                   |
| **Spontaneous Nystagmus Test**     | With gaze fixation and recording                                                     |

##### Modalities (16 modality types)

| Modality                         | Sub-Options / Parameters                                                               |
|----------------------------------|----------------------------------------------------------------------------------------|
| **Pain Relief**                  | General pain management modality                                                       |
| **Decrease Inflammation**        | Anti-inflammatory treatment                                                            |
| **Increase Blood Flow**          | Circulatory enhancement                                                                |
| **Improve Tissue Healing**       | Tissue repair promotion                                                                |
| **Electrical Stimulation**       | Pre-Modulated, High Volt, Interferential, Russian, Other                               |
| **Ultrasound / Phonophoresis**   | 1 MHz / 2 MHz / 3 MHz, Intensity, Duty Cycle, Duration                                |
| **Laser**                        | Cold Laser (duration), Class 4 Laser (duration)                                        |
| **Infrared Light**               | Duration                                                                               |
| **Diathermy**                    | Duration                                                                               |
| **Ultraviolet**                  | Duration                                                                               |
| **Vasopneumatic**                | Duration                                                                               |
| **Biofeedback Training**         | Duration                                                                               |
| **Whirlpool**                    | Warm / Cold, Duration                                                                  |
| **Paraffin Bath**                | Duration                                                                               |
| **Cryotherapy**                  | Ice Pack / Ice Massage, Duration                                                       |
| **Hot Packs**                    | Duration                                                                               |
| **Mechanical Traction**          | Cervical / Lumbar                                                                      |

##### Specialties (4 types)

| Specialty                  | Description                                |
|----------------------------|--------------------------------------------|
| **Orthotic Fabrication**   | Custom orthotic creation                   |
| **TENS Fitting**           | TENS unit fitting and training             |
| **Acupuncture**            | Acupuncture treatment                      |
| **Other**                  | Free-text specialty                        |

**Demo Steps:**
1. Enable Plan of Care: Frequency "3x/week", Duration "8 weeks".
2. Check Therapeutic Exercises (ROM, Strength, Endurance).
3. Check Manual Therapy (Soft Tissue Mobilization, Joint Mobilization).
4. Check Patient Education (Home Exercise Program, Lifting Mechanics).
5. Check Hot Packs: Duration 15 min.
6. Check Electrical Stimulation: Interferential.

#### For Daily Note: Simplified Plan

| Field                      | Type           | Description                                       |
|----------------------------|----------------|---------------------------------------------------|
| **Instructions**           | Select         | Pre-defined instruction codes                     |
| **Instruction Text**       | Text Area      | Additional instruction details                    |
| **Forward Button**         | Action         | Forward note to another provider                  |
| **Finalize Button**        | Action         | Finalize the daily note                           |

#### For Discharge Note: Discharge Plan

| Field                      | Type           | Description                                       |
|----------------------------|----------------|---------------------------------------------------|
| **Reason for Discharge**   | Select         | Pre-defined discharge reason codes (D01, etc.)    |
| **Discharge Disposition**  | Select         | Discharge destination codes (DN1, etc.)           |
| **Physician Signature**    | Toggle         | Physician signature required                      |

---

### 5.9 Step 5: BILLING Section (Detailed)

The Billing section documents all CPT codes for insurance claims:

| Field                      | Type           | Description                                              |
|----------------------------|----------------|----------------------------------------------------------|
| **Daily Note Included**    | Toggle         | Whether daily note billing is included                   |
| **Precautions**            | Text Area      | Treatment precautions                                    |
| **Objective Findings**     | Text Area      | Brief objective findings summary for billing             |
| **Pre-Treatment**          | Text Area      | Pre-treatment status                                     |
| **Post-Treatment**         | Text Area      | Post-treatment status                                    |

##### CPT Code Categories (11 billing sub-sections)

| Category                       | Description                                                                     |
|--------------------------------|---------------------------------------------------------------------------------|
| **Untimed Codes**              | Evaluation codes (97161-97163 for IE, 97164 for Re-eval, etc.)                 |
| **Direct Timed Codes**         | Treatment codes billed in 15-min units (97110 Therapeutic Exercise, 97112 Neuromuscular Re-ed, 97116 Gait Training, 97140 Manual Therapy, 97530 Therapeutic Activity, 97542 Wheelchair Management, etc.) |
| **Strapping**                  | Taping/strapping CPT codes                                                      |
| **Calendar Month**             | Monthly billing codes                                                           |
| **Nerve Conduction Studies**   | EMG/NCS procedure codes                                                         |
| **Respiratory**                | Respiratory therapy codes                                                       |
| **Other Treatment Procedures** | Additional procedure codes                                                      |
| **Supplies**                   | Medical supply codes (casting materials, orthotics supplies, etc.)              |
| **Splints / Orthotics**       | Splint and orthotic device codes                                                |
| **Casts**                      | Casting procedure codes                                                         |
| **Braces**                     | Brace/support device codes                                                      |

Each CPT code entry captures: **Code**, **Description**, **Units/Quantity**, and is toggled on/off via checkbox.

**Demo Steps:**
1. Check Untimed Code: 97163 (High Complexity Evaluation).
2. Check Direct Timed Codes: 97110 Therapeutic Exercise (2 units), 97140 Manual Therapy (2 units).
3. Check Hot Pack supply code.
4. Show the billing summary.

---

### 5.10 Saving a Draft

1. At **any point** during the stepper, click **Save as Draft**.
2. System saves all sections that have been filled in so far.
3. **Expected Result:**
   - Note appears in the patient's chart Records list with **Draft** status.
   - The note can be re-opened at any time via the **Complete** action to continue editing.
   - All previously entered data is preserved and re-loaded.

---

### 5.11 Re-Opening and Editing a Draft

1. Open patient chart > navigate to Records tab.
2. Find the drafted note in the records list.
3. Click the **Complete** action button.
4. The stepper wizard re-opens with all previously saved data pre-populated.
5. Navigate to the section that needs changes (e.g., go to Step 3 Assessment).
6. Make changes and click **Save as Draft** again.
7. **Expected Result:** Draft is updated with the new changes.

---

### 5.12 Creating Other Note Types

#### Daily Note

1. Click **Daily Note** action (available only after Initial Examination exists).
2. System creates note with encounter date and provider info.
3. Fill in the same SOAP + Billing stepper (sections may be simplified for daily documentation).
4. The Plan step shows the **simplified Daily Plan** with Instructions and Forward/Finalize buttons.
5. Save as Draft or Finalize directly.

#### Progress Note

1. Click **Progress Note** action.
2. Identical structure to Initial Examination (full SOAP + Billing).
3. The Plan step includes a **full Plan of Care** (same as IE) to document updated treatment plans.
4. Progress notes also generate:
   - **Plan of Care PDF** (exportable separately)
   - **Score Test PDF** (OMT results exportable separately)

#### Quick Discharge Note

1. Click **Quick Discharge** action.
2. A simplified form appears (NOT the full stepper):
   - **Discharge Date**: Select date
   - **Number of Visits**: Enter total visits
   - **Comment**: Optional free text
3. Click **Save/Finalize**.
4. **Expected Result:** Case is marked as discharged. No further notes can be created.

#### Discharge Note

1. Click **Discharge** action.
2. Full SOAP + Billing stepper opens.
3. The Plan step shows the **Discharge Plan** with:
   - Reason for Discharge (code selection)
   - Discharge Disposition (code selection)
   - Physician Signature toggle
4. Fill in all sections documenting discharge findings.
5. Save as Draft or Finalize.

---

## Scenario 6: Finalize a Medical Note

**Goal:** Demonstrate finalizing a drafted note, locking it from further edits.

### Steps

1. Open patient `Michael Davis` > navigate to **Chart / Records**.
2. Open the drafted **Initial Examination** note by clicking **Complete**.
3. Review all sections for completeness:
   - Subjective: Basic info, pain, medical history, current/prior function all filled.
   - Objective: Inspection, observation, ROM, strength, neuro-vascular, special tests, palpation documented.
   - Assessment: Diagnosis, problems, goals defined.
   - Plan: Procedures, modalities, specialties selected with frequency and duration.
   - Billing: CPT codes selected with correct units.
4. Navigate to the last step (Plan for Daily Note, or the final step of the stepper).
5. Click **Finalize Note**.
6. A **confirmation dialog** appears: "Are you sure you want to finalize this note?"
7. Click **Yes** to confirm.
8. **Expected Result:**
   - Toast notification: "Medical note has been finalized".
   - Note status changes from **Draft** to **Finalized**.
   - The note is now **read-only** and cannot be edited.
   - The note is recorded in the patient's chart with the treating doctor's provider info (name, NPI, credential, license, specialty).
   - Chart records list is refreshed to reflect the finalized status.
   - Record actions change: **Complete** is no longer available; **View PDF** and **Forward** become available.

### PDF Export After Finalization

1. From the Records list, click **View PDF** on the finalized note.
2. System generates and downloads a PDF containing the complete note content.
3. PDF types available per note:
   - **Initial Examination**: Main note PDF + Plan of Care PDF + Score Test PDF
   - **Daily Note**: Note PDF
   - **Progress Note**: Main note PDF + Plan of Care PDF + Score Test PDF
   - **Discharge Note**: Note PDF
   - **Quick Discharge**: Note PDF

---

## Scenario 7: Forward Note to Another Doctor and Co-Sign

**Goal:** Demonstrate forwarding a finalized note to another doctor for co-signature, reviewing incomplete co-sign documents, and finalizing the forwarded note.

### 7A - Forward a Note

1. Log in as **Dr. Sarah Johnson**.
2. Open patient `Michael Davis` > navigate to **Chart / Records**.
3. Open a note (e.g., the Daily Note) and navigate to the **Plan** step.
4. Click the **Forward** button.
5. The **Forward Modal** opens:
   - System queries for eligible providers in the current clinic who are authorized to finalize/co-sign (using `findAuthProviderToFinalize` API).
   - A dropdown shows available providers (only doctors with the `finalize-medical-note-role`).
   - Select the target doctor: `Dr. John Smith`.
   - If no eligible providers exist: "Sorry There is no available provider to forward."
6. Click **Forward**.
7. System records **forward metadata**:
   - **Forwarded By**: Dr. Sarah Johnson (providerId, providerName as "Johnson, Sarah", NPI, credential, license, specialty)
   - **Forwarded To**: Dr. John Smith (providerId, providerName as "Smith, John", NPI, credential, license, specialty)
   - **Patient Case ID**: linked case UUID
8. **Expected Result:**
   - The note is forwarded to Dr. John Smith.
   - System navigates back to the Records list.
   - The record now shows a "forwarded" indicator.

### 7B - Showing Incomplete Co-Sign Documents

1. Log in as **Dr. John Smith**.
2. Navigate to **Incoming Co-Sign Documents** from the navigation.
3. System calls `medical/note/forward-info?providerId={doctorUuid}` to load all forwarded notes.
4. The list displays all forwarded notes pending co-signature:

   | Column         | Data                                        |
   |----------------|---------------------------------------------|
   | Patient Name   | Davis, Michael                              |
   | Note Type      | Daily Note                                  |
   | Case ID        | Lower Back Pain - MVA                       |
   | Forwarded By   | Johnson, Sarah                              |
   | Date           | 2026-04-06                                  |

5. The list **auto-filters by the currently selected clinic**. Switching clinics in the header re-filters the list.
6. **Expected Result:** Dr. John Smith sees all pending co-sign documents assigned to him across all or the selected clinic.

### 7C - Finalize a Forwarded Note (Co-Sign)

1. From the **Incoming Co-Sign Documents** list, click on the forwarded Daily Note.
2. System navigates to: `/emr/patient/cosign-review/{noteId}/{noteType}/{caseId}`.
3. The **Co-Sign Review** page loads the full note content.
4. Dr. John Smith reviews all sections:
   - Subjective: Verifies patient history and complaints
   - Objective: Reviews clinical measurements
   - Assessment: Confirms diagnosis, problems, and goals
   - Plan: Reviews treatment plan
   - Billing: Verifies CPT codes
5. After reviewing, click **Finalize / Co-Sign**.
6. Confirm the action.
7. **Expected Result:**
   - The note is co-signed by Dr. John Smith.
   - The note now carries **both** provider signatures:
     - Original treating doctor: Dr. Sarah Johnson (with NPI, credential, license, specialty)
     - Co-signing doctor: Dr. John Smith (with NPI, credential, license, specialty)
   - The note is **removed** from the Incoming Co-Sign Documents list.
   - The patient's chart record reflects the completed co-signature.
   - The note is fully finalized and locked.

### 7D - Forward Across All Note Types

The forward/co-sign flow works identically for **all 5 note types**:

| Note Type              | Forward Service                  |
|------------------------|----------------------------------|
| Initial Examination    | `initialExamNoteService.forward` |
| Daily Note             | `dailyNoteService.forward`       |
| Progress Note          | `progressNoteService.forward`    |
| Discharge Note         | `dischargeNoteService.forward`   |
| Quick Discharge Note   | `quickDischargeNoteService.forward` |

---

## Medical Note Lifecycle Summary

```
CREATE NOTE
    |
    v
[Draft] --save--> [Draft] --save--> [Draft]  (can save/edit multiple times)
    |
    v
FINALIZE
    |
    v
[Finalized] ---> View PDF / Export
    |
    +--> FORWARD to another doctor
              |
              v
         [Incoming Co-Sign Docs]
              |
              v
         CO-SIGN / FINALIZE by receiving doctor
              |
              v
         [Fully Signed & Locked]
```

---

## Demo Flow Summary

| Step | Scenario                          | Actor              | Key Outcome                              |
|------|-----------------------------------|--------------------|------------------------------------------|
| 1    | Create Organization               | New User           | Organization + Clinics + Root Doctor     |
| 2    | Create & Activate Doctor          | Admin + Doctor     | Doctor account active with signature     |
| 3    | Doctor Login                      | Doctor             | Authenticated with clinic context        |
| 4    | Create Patient & Case             | Doctor             | Patient record + treatment case          |
| 5    | Medical Notes Deep Dive           | Doctor             | Full SOAP + Billing documentation        |
| 6    | Finalize Note                     | Doctor             | Note locked, signed, PDF available       |
| 7    | Forward & Co-Sign Note            | Doctor A > Doctor B | Note forwarded, co-signed, completed     |

---

*Document prepared for stakeholder demo - COB EMR System*
