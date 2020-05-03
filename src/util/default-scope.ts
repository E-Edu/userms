import { ScopeEnum } from '../model/scope.enum';

export const defaultScope: ScopeEnum[] = [
    ScopeEnum.USER,
    ScopeEnum.USER_USER_WRITE_SELF,
    ScopeEnum.USER_USER_DELETE_SELF,
    ScopeEnum.TASK_SUBJECT_READ_ALL,
    ScopeEnum.TASK_MODULE_READ_ALL,
    ScopeEnum.TASK_LECTURE_READ_ALL,
    ScopeEnum.TASK_LECTUREGROUP_READ_ALL,
    ScopeEnum.TASK_TASK_READ,
];
