import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldDependentsService {

  constructor() { }
  private mapById(objects: any): Map<string, any> {
  const map = new Map<string, any>();
  objects.forEach(obj => map.set(obj.idField.id, { ...obj, dependents: [] })); // Ensure dependents exists
  return map;
}

// **Recursive function to build hierarchy**
 buildHierarchyRecursive(objects: any[]): any[] {
  const objectMap = this.mapById(objects);
  const rootObjects: any[] = [];

  objects.forEach(obj => {
    if (obj.parentField) {
      const parent = objectMap.get(obj.parentField);
      if (parent) {
        parent.dependents!.push(objectMap.get(obj.idField.id)!); // Assign child to parent
      }
    } else {
      rootObjects.push(objectMap.get(obj.idField.id)!); // Root elements
    }
  });

  return rootObjects;
}
}
