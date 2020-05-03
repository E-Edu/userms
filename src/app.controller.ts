import { Controller, Get } from '@nestjs/common';
import { StatusCodesEnum } from './model/status-codes.enum';
import { StatusDto } from './model/status.dto';

@Controller()
export class AppController {
    @Get()
    health(): StatusDto {
        return { status: StatusCodesEnum.OK };
    }
}
