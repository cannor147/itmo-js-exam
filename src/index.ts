/* eslint-disable @typescript-eslint/no-explicit-any */
function getPropertyByName(obj: { [key: string]: any }, propertyName: string) {
  return obj[propertyName];
}

function deepClone<T>(origin: T): T {
  if (origin === null || typeof origin !== 'object') {
    return origin;
  }

  if (origin instanceof Array) {
    const copy = Array<any>();

    for (const element of origin) {
      copy.push(deepClone(element));
    }

    return copy as any;
  }
  if (origin !== {}) {
    const copy = {};
    const propertyNames = Object.getOwnPropertyNames(origin);

    for (const propertyName of propertyNames) {
      const propertyValue = getPropertyByName(origin, propertyName);
      const propertyDescriptor = Object.getOwnPropertyDescriptor(origin, propertyName);

      if (propertyDescriptor) {
        const descriptorAttributes = {
          value: deepClone<any>(propertyValue),
          writable: propertyDescriptor.writable,
          configurable: propertyDescriptor.configurable,
          enumerable: propertyDescriptor.enumerable
        };
        Object.defineProperty(copy, propertyName, descriptorAttributes);
      }
    }

    return copy as T;
  }

  return origin;
}

export function deepCloneObject<T extends object>(origin: T): T {
  return deepClone<T>(origin);
}
