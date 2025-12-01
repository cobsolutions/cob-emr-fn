export class InitSubjectiveBasicMapper {
    public static mapper(basic: any) {
        if (!basic.timeInTimeOut) {
            basic.timeIn = null;
            basic.timeOut = null;
        }
        if (basic.workMechanicalStresses !== undefined && basic.workMechanicalStresses)
            basic.workMechanicalStresses = basic.workMechanicalStressesText;
        if (basic.leisureMechanicalStresses !== undefined && basic.leisureMechanicalStresses)
            basic.leisureMechanicalStresses = basic.leisureMechanicalStressesText;
        if (basic.functionalDisabilityFromPresentEpisode !== undefined && basic.functionalDisabilityFromPresentEpisode)
            basic.functionalDisabilityFromPresentEpisode = basic.functionalDisabilityFromPresentEpisodeText
        if (basic.functionalDisabilityScore !== undefined && basic.functionalDisabilityScore)
            basic.functionalDisabilityScore = basic.functionalDisabilityScoreText;
        if (basic.presentSymptoms !== undefined && basic.presentSymptoms)
            basic.presentSymptoms = basic.presentSymptomsSelect
        if (basic.commencedAsResultOf !== undefined && basic.commencedAsResultOf)
            basic.commencedAsResultOf = basic.commencedAsResultofText;
        if (basic.symptomsAtOnset !== undefined && basic.symptomsAtOnset)
            basic.symptomsAtOnset = basic.symptomsAtOnsetSelect
        if (basic.constantSymptoms !== undefined && basic.constantSymptoms)
            basic.constantSymptoms = basic.constantSymptomsSelect

        if (basic.intermittentSymptoms !== undefined && basic.intermittentSymptoms)
            basic.intermittentSymptoms = basic.intermittentSymptomsSelect
        if (basic.bladder !== undefined && basic.bladder)
            basic.bladder = basic.bladderSelect;
        if (basic.newInjury !== undefined && basic.newInjury)
            basic.newInjury = basic.newInjuryText;
        if (basic.specificPhysicianOrders !== undefined && basic.specificPhysicianOrders)
            basic.specificPhysicianOrders = basic.specificPhysicianOrdersText;
    }
}