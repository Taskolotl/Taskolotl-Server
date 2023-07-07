import { GlobalScoringData } from "./GlobalScoringData"
import { CategoryData } from "./CategoryData"

export interface TaskolotlState {
    scoringData: GlobalScoringData
    categoryData: CategoryData[];
}