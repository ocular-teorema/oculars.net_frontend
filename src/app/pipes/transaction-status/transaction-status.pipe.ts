import { Pipe, PipeTransform } from '@angular/core';

const STATUS = {
  0: 'Неуспешно',
  1: 'В процессе',
  2: 'Успешно'
};

@Pipe({
  name: 'transactionStatus'
})
export class TransactionStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return STATUS[value];
  }

}
