import { StatusEnum } from "../auth/types";

export interface IDiscipline {
  name: string,
  lecturer: string,
  date: string,
  mark: string,
  type: string
}

export interface PerformanceState {
  disciplines: IDiscipline[];
}
