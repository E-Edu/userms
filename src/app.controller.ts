import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StatusCodesEnum } from './model/status-codes.enum';
import { StatusModel } from './model/status.model';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    health(): StatusModel {
        return { status: StatusCodesEnum.OK };
    }
}
