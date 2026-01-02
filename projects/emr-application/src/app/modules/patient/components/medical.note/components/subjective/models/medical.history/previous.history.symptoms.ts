export interface PreviousHistorySymptoms{
    //previousEpisodesOfSameComplaints
    isEpisode?:boolean,
    //previousEpisodesOfSameComplaintsRange
    episodeAgerRange?:string,
    //previousEpisodesOfSameComplaintsYearFirstEpisode
    episodeYear?:number
    //previousTreatmentsForSimilarSymptoms
    isSimilarSymptoms?:boolean,
    //previousHistoryOfSimilarSymptomsText
    similarSymptomsTxt?:string
    //previousTreatmentsForSimilarSymptomsText
    description?:string
}