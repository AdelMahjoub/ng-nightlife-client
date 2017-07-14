import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {
  
  transform(distance: number): string {
    let language = navigator.language;
    if(language === 'fr') return ~~(distance / 1000) + ' Km';
    else return ~~(distance / 1609) + ' Mi'
  }

}
