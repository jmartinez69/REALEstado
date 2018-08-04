import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }    
    
    const myPattern = new RegExp(value, 'i');
    let propPadre = field.split(".")[0];
    let propHijo = field.split(".")[1];    
    if (field.split(".").length > 1){
     switch (propHijo) {
       case "tamanom2": 

       case "numHab": 

       case "numBan": return items.filter(it => it[propPadre][propHijo] <= parseInt(value));
       default: return items.filter(it => (it[propPadre][propHijo]).match(myPattern));
     }
    } else {
      if (propPadre ==  "precio"){
        return items.filter(it => (it[field] <= parseInt(value)));
      } else {
        return items.filter(it => it[field].match(myPattern));
      }
    }
  }
}