// @ts-ignore
import * as moment from 'moment';

export class Timestamp {
    static now(): string {
        return moment().format('YYYY.MM.DD-HH:mm.ss.SSS ZZ');
    }
}
