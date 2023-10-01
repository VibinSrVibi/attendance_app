import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showAttendanceReport'
})
export class ShowAttendanceReportPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
