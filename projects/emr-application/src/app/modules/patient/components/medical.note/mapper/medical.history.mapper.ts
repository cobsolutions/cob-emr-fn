export class MedicalHistoryMapper {
    private static readonly reviewKeys = [
        'medical_history_review_assessment_low_complexity',
        'medical_history_review_assessment_moderate_complexity',
        'medical_history_review_assessment_high_complexity',
        'medical_history_review_other',
    ] as const;

    private static readonly simplificationMap: Record<string, string> = {
        medical_history_review_assessment_low_complexity: 'low',
        medical_history_review_assessment_moderate_complexity: 'moderate',
        medical_history_review_assessment_high_complexity: 'high'
    };
    public static map(medicalHistory: any): void {
        if (!medicalHistory) return;

        // Reset flags
        this.reviewKeys.forEach(key => {
            medicalHistory[key] = false;
        });

        const selected = medicalHistory.medicalHistoryReviewMedicalHistory;

        // Set the matching flag to true
        if (typeof selected === 'string' && this.reviewKeys.includes(selected as any)) {
            medicalHistory[selected] = true;
        }

        // Rewrite medicalHistoryReviewMedicalHistory to simplified value
        if (selected in this.simplificationMap) {
            medicalHistory.medicalHistoryReviewMedicalHistory =
                this.simplificationMap[selected];
        }
    }
}