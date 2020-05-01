import { Controller, Get } from '@nestjs/common';
import { StatusCodesEnum } from './model/status-codes.enum';
import { StatusModel } from './model/status.model';

@Controller()
export class AppController {

    @Get()
    health(): StatusModel {
        return { status: StatusCodesEnum.OK };
    }
}
