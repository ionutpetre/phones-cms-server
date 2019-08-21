import { Phone } from './phone.entity';

export const phones: Phone[] = [
  new Phone(1, 'Samsung', 'S9', 'black', { os: 'Android' }),
  new Phone(2, 'iPhone', 'X', 'white', { os: 'iOS' }),
  new Phone(3, 'Huawei', 'P20', 'silver', { os: 'Android' }),
];
