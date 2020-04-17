/* eslint-disable @typescript-eslint/no-explicit-any */
import { deepCloneObject } from '../src';

function getPropertyByName(obj: { [key: string]: any }, propertyName: string) {
  return obj[propertyName];
}
const addString = (arg: object) => {
  Object.defineProperty(arg, 'cat', {
    value: 'meow',
    enumerable: true
  });
};
const addBoolean = (arg: object) => {
  Object.defineProperty(arg, 'dog', {
    value: false,
    enumerable: true
  });
};
const addNumber = (arg: any[]) => {
  arg.push(34);
};
const addNumberDeep = (arg: object) => {
  (getPropertyByName(arg, 'fibs') as number[]).push(21);
};
const addNumbers = (arg: object) => {
  const numbers = [1, 1, 2, 3, 5, 8, 13];
  Object.defineProperty(arg, 'fibs', {
    value: numbers,
    enumerable: true
  });
};

describe('Deep clone', () => {
  it('Test cloning', () => {
    const origin = {
      first: 'a',
      second: 'b'
    };

    const clone = deepCloneObject(origin);
    expect(clone).not.toBe(origin);

    expect(clone).toEqual(origin);
  });
  it('Test property changing', () => {
    const origin = {
      value: true
    };

    const firstClone = deepCloneObject(origin);
    expect(firstClone).not.toBe(origin);

    const secondClone = deepCloneObject(origin);
    expect(secondClone).not.toBe(origin);
    secondClone.value = false;

    expect(firstClone).toEqual(origin);
    expect(secondClone).not.toEqual(origin);
  });
  it('Test empty object', () => {
    const origin = {};

    const clone = deepCloneObject(origin);
    expect(clone).not.toBe(origin);
    addString(clone);

    expect(clone).not.toEqual(origin);
  });
  it('Test non-empty object', () => {
    const origin = {
      from: '10:00+5',
      to: '18:00+5'
    };

    const clone = deepCloneObject(origin);
    expect(clone).not.toBe(origin);
    addString(clone);

    expect(clone).not.toEqual(origin);
  });
  it('Test non-empty object with arrays', () => {
    const origin = {
      Danny: [
        { from: 'ПН 12:00+5', to: 'ПН 17:00+5' },
        { from: 'ВТ 13:00+5', to: 'ВТ 16:00+5' }
      ],
      Rusty: [
        { from: 'ПН 11:30+5', to: 'ПН 16:30+5' },
        { from: 'ВТ 13:00+5', to: 'ВТ 16:00+5' }
      ],
      Linus: [
        { from: 'ПН 09:00+3', to: 'ПН 14:00+3' },
        { from: 'ПН 21:00+3', to: 'ВТ 09:30+3' },
        { from: 'СР 09:30+3', to: 'СР 15:00+3' }
      ]
    };

    const clone = deepCloneObject(origin);
    expect(clone).not.toBe(origin);
    addString(clone);

    expect(clone).not.toEqual(origin);
  });
  it('Test various changing', () => {
    const origin = {
      Sam: {
        focus: 100,
        wisdom: 50
      },
      Sally: {
        focus: 100,
        wisdom: 60
      },
      Bill: {
        focus: 90,
        wisdom: 50
      },
      Sharon: {
        focus: 110,
        wisdom: 40
      }
    };

    const firstClone = deepCloneObject(origin);
    expect(firstClone).not.toBe(origin);
    addNumbers(firstClone);

    const secondClone = deepCloneObject(firstClone);
    expect(secondClone).not.toBe(origin);
    addString(secondClone);

    const thirdClone = deepCloneObject(secondClone);
    expect(thirdClone).not.toBe(origin);
    addNumberDeep(thirdClone);

    const fourthClone = deepCloneObject(thirdClone);
    expect(fourthClone).not.toBe(origin);
    addBoolean(fourthClone);

    expect(origin).not.toEqual(firstClone);
    expect(firstClone).not.toEqual(secondClone);
    expect(secondClone).not.toEqual(thirdClone);
    expect(thirdClone).not.toEqual(fourthClone);
  });
  it('Test array of objects', () => {
    const origin = [
      {
        name: 'Sam',
        friends: ['Mat', 'Sharon'],
        gender: 'male',
        best: true
      },
      {
        name: 'Sally',
        friends: ['Brad', 'Emily'],
        gender: 'female',
        best: true
      },
      {
        name: 'Mat',
        friends: ['Sam', 'Sharon'],
        gender: 'male'
      },
      {
        name: 'Sharon',
        friends: ['Sam', 'Itan', 'Mat'],
        gender: 'female'
      },
      {
        name: 'Brad',
        friends: ['Sally', 'Emily', 'Julia'],
        gender: 'male'
      },
      {
        name: 'Emily',
        friends: ['Sally', 'Brad'],
        gender: 'female'
      },
      {
        name: 'Itan',
        friends: ['Sharon', 'Julia'],
        gender: 'male'
      },
      {
        name: 'Julia',
        friends: ['Brad', 'Itan'],
        gender: 'female'
      }
    ];

    const clone = deepCloneObject(origin);
    expect(clone).not.toBe(origin);
    addNumber(clone);

    expect(clone).not.toEqual(origin);
  });
  it('Test array of numbers', () => {
    const origin = [2, 5, 10, 14];

    const clone = deepCloneObject(origin);
    expect(clone).not.toBe(origin);
    addNumber(clone);

    expect(clone).not.toEqual(origin);
  });
  it('Test deep changing for string', () => {
    // noinspection JSPrimitiveTypeWrapperUsage
    const origin = {
      venus: new String('Venus'),
      earth: new String('Earth')
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    origin.earth.sputnik = 'Moon';

    const clone = deepCloneObject(origin);
    expect(clone).not.toBe(origin);
    addString(clone);

    expect(clone).not.toEqual(origin);
  });
});
