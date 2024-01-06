/* tslint:disable */
import { SimpleChanges } from '@angular/core';

export class PropertyHelper {

  public static isFunction(fn: any): boolean {
    return typeof fn === 'function';
  }

  public static hasChanges(changes: SimpleChanges, propName: string) {
    return changes.hasOwnProperty(propName) && changes[propName].previousValue != changes[propName].currentValue;
  }

  /**
   *
   * @param obj - object which props are checking
   * @param complexPropName - name of property object should have
   * @param returnLastProp - if true returns prop value, if false returns object
   * @param addNonExistedProp - is need to add prop
   * @param valueOfLastProp - is the value of lat property
   * @param defaultValue - value to return if has no prop
   */
  public static getComplexProp(obj: any,
                               complexPropName: string,
                               returnLastProp: boolean = true,
                               addNonExistedProp: boolean = false,
                               valueOfLastProp?: any,
                               defaultValue: any = undefined): any {
    if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) {
      return obj;
    }

    const split = complexPropName.split('.');
    let tempObj = obj;
    let prevProp: any = defaultValue;

    const splitLength = split.length;

    split.forEach((propName, index) => {
      const isLastIndex = index === splitLength - 1;
      const propExists = tempObj.hasOwnProperty(propName) || (tempObj.hasOwnProperty('hasAttribute') && tempObj.hasAttribute(propName));
      prevProp = index === 0 ? prevProp : tempObj;

      if (propExists) {
        if (isLastIndex && (addNonExistedProp || valueOfLastProp)) {
          tempObj[propName] = valueOfLastProp;
        }
        tempObj = tempObj[propName];
        return;
      }

      if (!addNonExistedProp) {
        tempObj = defaultValue;
        return;
      }

      tempObj[propName] = isLastIndex ? valueOfLastProp : {};
      tempObj = tempObj[propName];
    });

    return returnLastProp ? tempObj : prevProp;
  }
}
