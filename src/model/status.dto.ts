import { StatusCodesEnum } from './status-codes.enum';

export interface StatusDto {
    message?: string;
    status: StatusCodesEnum;
}
