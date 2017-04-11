export interface IGoal {
    _id?: string;
    name: string;
    startDate?: Date;
    endDate?: Date;
    parentGoal?: string;
}