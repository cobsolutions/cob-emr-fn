# ROM Config Naming Convention Fixes

## Summary

Fixed all ROM config files to match the field naming conventions expected by the mapper service. The mapper service has hardcoded field name expectations, and configs were generating incorrect field names.

## Why This Was Needed

The configs use `fieldPrefix` to generate form control names via shared utilities. These generated names MUST match exactly what the mapper service expects, otherwise:
- Form data won't map to backend models
- Data will be lost (fields default to 'not_tested')
- Loading data from backend won't populate the form

## Field Naming Pattern Reference

Based on mapper service analysis, here are the actual patterns used:

### AROM Sections (Measurement Tables)

| Section | Field Prefix | Comments Field | Example Field |
|---------|--------------|----------------|---------------|
| Shoulder AROM | `shoulder_` | `shoulder_comments` | `shoulder_flexion_right` |
| Elbow AROM | `elbow_arrom_` | `elbow_arrom_comments` | `elbow_arrom_flexion_right` |
| Wrist AROM | `''` (empty!) | `wrist_arrom_comments` | `flexion_right` |
| Hip AROM | `hip_` | `hip_arrom_comments` | `hip_flexion_right` |
| Knee AROM | `knee_` | `knee_arrom_comments` | `knee_flexion_right` |
| Ankle AROM | `ankle_` | `ankle_arrom_comments` | `ankle_plantarflexion_right` |
| First MTP AROM | `fst_mtp_` | `fst_mtp_arrom_comments` | `fst_mtp_flexion_right` |
| First IP AROM | `fst_ip_` | `fst_ip_arrom_comments` | `fst_ip_flexion_right` |
| Toe AROM | `toe_arom_` | `toe_arrom_comments` | `toe_arom_2nd_mtp_flexion_right` |

### AROM Sections (Single Column Tables)

| Section | Field Prefix | Comments Field | Example Field |
|---------|--------------|----------------|---------------|
| Cervical AROM | `cervical_` | `cervical_comments` | `cervical_forward_bending` |
| Lumbar AROM | `lumbar_arrom_` | `lumbar_arrom_comments` | `lumbar_arrom_forward_bending` |
| Costovertebral | `costovertebral_` | `costovertebral_expansion_comments` | `costovertebral_t4` |

### PROM Sections (All Measurement + Endfeel Tables)

| Section | Field Prefix | Comments Field | Example Field |
|---------|--------------|----------------|---------------|
| Shoulder PROM | `shoulder_prom_` | `shoulder_prom_comments` | `shoulder_prom_flexion_right` |
| Elbow PROM | `elbow_prom_` | `elbow_prom_comments` | `elbow_prom_flexion_right` |
| Wrist PROM | `wrist_prom_` | `wrist_prom_comments` | `wrist_prom_flexion_right` |
| Hip PROM | `hip_prom_` | `hip_prom_comments` | `hip_prom_flexion_right` |
| Knee PROM | `knee_prom_` | `knee_prom_comments` | `knee_prom_flexion_right` |
| Ankle PROM | `ankle_prom_` | `ankle_prom_comments` | `ankle_prom_plantarflexion_right` |
| Toe PROM | `toe_prom_` | `toe_prom_comments` | `toe_prom_2nd_mtp_flexion_right` |

## Changes Made

### 1. cervical-arom.ts ✅
**Before:**
```typescript
fieldPrefix: 'cervical_arom_',
commentsFieldName: 'cervical_arom_comments',
```

**After:**
```typescript
fieldPrefix: 'cervical_',
commentsFieldName: 'cervical_comments',
```

**Reason:** Mapper expects `cervical_forward_bending` not `cervical_arom_forward_bending`

---

### 2. shoulder-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'shoulder_arrom_',
applyToAllFieldName: 'shoulder_arrom_apply_to_all',
commentsFieldName: 'shoulder_arrom_comments',
```

**After:**
```typescript
fieldPrefix: 'shoulder_',
applyToAllFieldName: 'shoulder_apply_to_all',
commentsFieldName: 'shoulder_comments',
```

**Reason:** Mapper expects `shoulder_flexion_right` not `shoulder_arrom_flexion_right`

---

### 3. elbow-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'elbow_arom_',  // Wrong: single 'r'
commentsFieldName: 'elbow_arom_comments',
```

**After:**
```typescript
fieldPrefix: 'elbow_arrom_',  // Correct: double 'r'
commentsFieldName: 'elbow_arrom_comments',
```

**Reason:** Mapper expects `elbow_arrom_flexion_right` not `elbow_arom_flexion_right`

---

### 4. wrist-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'wrist_arrom',  // Missing trailing underscore
```

**After:**
```typescript
fieldPrefix: '',  // Empty! Wrist AROM has no prefix
```

**Reason:** Mapper expects `flexion_right` not `wrist_arrom_flexion_right`
**Note:** This is unusual but correct per mapper service

---

### 5. knee-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'knee_arrom_',
applyToAllFieldName: 'knee_arrom_apply_to_all',
commentsFieldName: 'knee_arrom_comments',
```

**After:**
```typescript
fieldPrefix: 'knee_',
applyToAllFieldName: 'knee_apply_to_all',
commentsFieldName: 'knee_arrom_comments',  // Comments keeps arrom!
```

**Reason:** Mapper expects `knee_flexion_right` but `knee_arrom_comments` for comments

---

### 6. ankle-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'ankle_arom_',
applyToAllFieldName: 'ankle_arom_apply_to_all',
commentsFieldName: 'ankle_arom_comments',
```

**After:**
```typescript
fieldPrefix: 'ankle_',
applyToAllFieldName: 'ankle_apply_to_all',
commentsFieldName: 'ankle_arrom_comments',  // Changed to arrom
```

**Reason:** Mapper expects `ankle_plantarflexion_right` and `ankle_arrom_comments`

---

### 7. fst-mtp-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'fst_mtp_arrom_',
applyToAllFieldName: 'fst_mtp_arrom_apply_to_all',
commentsFieldName: 'fst_mtp_arrom_comments',
```

**After:**
```typescript
fieldPrefix: 'fst_mtp_',
applyToAllFieldName: 'fst_mtp_apply_to_all',
commentsFieldName: 'fst_mtp_arrom_comments',  // Comments keeps arrom
```

**Reason:** Mapper expects `fst_mtp_flexion_right` and `fst_mtp_arrom_comments`

---

### 8. fst-ip-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'fstip_arom_',
applyToAllFieldName: 'fstip_arom_apply_to_all',
commentsFieldName: 'fstip_arom_comments',
```

**After:**
```typescript
fieldPrefix: 'fst_ip_',
applyToAllFieldName: 'fst_ip_apply_to_all',
commentsFieldName: 'fst_ip_arrom_comments',  // Changed to arrom and added underscore
```

**Reason:** Mapper expects `fst_ip_flexion_right` and `fst_ip_arrom_comments`

---

### 9. toe-arom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'toe_arrom_',  // Double 'r'
applyToAllFieldName: 'toe_arrom_apply_to_all',
commentsFieldName: 'toe_arrom_comments',
```

**After:**
```typescript
fieldPrefix: 'toe_arom_',  // Single 'r'
applyToAllFieldName: 'toe_arom_apply_to_all',
commentsFieldName: 'toe_arrom_comments',  // Comments keeps double 'r'
```

**Reason:** Mapper expects `toe_arom_2nd_mtp_flexion_right` and `toe_arrom_comments`

---

### 10. shoulder-prom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'shoulderProm_',  // camelCase!
applyToAllFieldName: 'shoulderProm_apply_to_all',
commentsFieldName: 'shoulderProm_comments',
```

**After:**
```typescript
fieldPrefix: 'shoulder_prom_',  // snake_case
applyToAllFieldName: 'shoulder_prom_apply_to_all',
commentsFieldName: 'shoulder_prom_comments',
```

**Reason:** Mapper expects `shoulder_prom_flexion_right` not `shoulderProm_flexion_right`

---

### 11. elbow-prom-config.ts ✅
**Before:**
```typescript
fieldPrefix: 'elbo_prom_',  // Typo!
applyToAllFieldName: 'elbo_prom_apply_to_all',
commentsFieldName: 'elbo_prom_comments',
```

**After:**
```typescript
fieldPrefix: 'elbow_prom_',  // Fixed typo
applyToAllFieldName: 'elbow_prom_apply_to_all',
commentsFieldName: 'elbow_prom_comments',
```

**Reason:** Fixed typo - should be "elbow" not "elbo"

---

### Already Correct ✅

These configs were already correct and required no changes:
- **lumbar-arom-config.ts** - `lumbar_arrom_` ✓
- **hip-arom-config.ts** - `hip_` ✓
- **costovertebral.expansion-config.ts** - `costovertebral_` ✓
- **hip-prom-config.ts** - `hip_prom_` ✓
- **wrist-prom-config.ts** - `wrist_prom_` ✓
- **ankle-prom-config.ts** - `ankle_prom_` ✓
- **knee-prom-config.ts** - `knee_prom_` ✓
- **toe-prom-config.ts** - `toe_prom_` ✓

---

## Key Observations

### Inconsistent Naming in Mapper Service

The mapper service has **inconsistent naming patterns** that configs must match:

1. **Some AROM sections include `_arrom_`:** Elbow AROM, Lumbar AROM
2. **Some AROM sections don't:** Shoulder AROM, Hip AROM, Knee AROM, Cervical AROM
3. **Wrist AROM has NO prefix at all:** Just `flexion_right`
4. **Comments fields often use `arrom` even when fields don't:** `knee_flexion_right` but `knee_arrom_comments`
5. **All PROM sections consistently use `_prom_`:** This is the only consistent pattern

### Why Is It Inconsistent?

This inconsistency likely evolved over time as different developers added sections without following a unified convention. The mapper service was written with hardcoded field names, so we must match exactly what it expects.

### Future Improvement

With the new **dynamic mapper utilities** (mapper-utils.ts), future sections can use configs exclusively, and the mapper will automatically generate correct field names. This eliminates the need for manual hardcoded mapping.

---

## Testing

Build completed successfully with no errors:
```
Build at: 2025-12-20T23:20:10.593Z
Hash: d4dd1a4e3eba3c6e
✔ Browser application bundle generation complete.
```

All config naming conventions now match mapper service expectations.

---

## Files Modified

Total: 11 config files updated

### AROM Configs (9):
1. cervical-arom.ts
2. shoulder-arom-config.ts
3. elbow-arom-config.ts
4. wrist-arom-config.ts
5. knee-arom-config.ts
6. ankle-arom-config.ts
7. fst-mtp-arom-config.ts
8. fst-ip-arom-config.ts
9. toe-arom-config.ts

### PROM Configs (2):
1. shoulder-prom-config.ts
2. elbow-prom-config.ts

---

## Next Steps

All config files now generate field names that match the mapper service expectations. When creating new sections:

1. **Check mapper service first** to see what field names it expects
2. **Set fieldPrefix accordingly** in your config
3. **Use dynamic mapper utilities** (from mapper-utils.ts) instead of manual mapping
4. **Follow the pattern:**
   - AROM: varies by section (check mapper!)
   - PROM: always `{body_part}_prom_`
