/*
 *@Author Madjid Taoualit
 * M1-IWOCS-2021
 */
/* Coded using  ECMASript 6 (class) Pattern */


export const version = () => '1.0.0';

/* Creating export constant function Enumeration */

export const Enumeration = function (keys) {
  const enumeration = Object.create(null);
  for (const key of keys) {
    enumeration[key] = key;
  }
  enumeration[Symbol.iterator] = function* () {
    for (const key of keys) {
      yield enumeration[key];
    }
  };
  Object.freeze(enumeration);
  return enumeration;
};

/* Adding enumeration variable */

var myEnum = new Enumeration(['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'SWITCH', 'DOOR', 'FAN_SPEED']);
