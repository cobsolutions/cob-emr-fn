export interface PreviousHistorySymptoms{
    //previousEpisodesOfSameComplaints
    isEpisode?:string,
    //previousEpisodesOfSameComplaintsRange
    episodeAgerRange?:string,
    //previousEpisodesOfSameComplaintsYearFirstEpisode
    episodeYear?:number
    //previousTreatmentsForSimilarSymptoms
    isSimilarSymptoms?:string,
    //previousHistoryOfSimilarSymptomsText
    similarSymptomsTxt?:string
    //previousTreatmentsForSimilarSymptomsText
    description?:string
}