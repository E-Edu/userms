import { StatusCodesEnum } from './status-codes.enum';

export interface StatusModel {
    message?: string;
    status: StatusCodesEnum;
}
