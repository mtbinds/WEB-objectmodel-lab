/*
 *@Author Madjid Taoualit
 * M1-IWOCS-2021
 */
/* Coded using  ECMASript 6 (class) Pattern */

export const version = () => '1.0.0';

//The Sensor Types
export const sensorType = {
  'TEMPERATURE': 'TEMPERATURE',
  'HUMIDITY': 'HUMIDITY',
  'LIGHT': 'LIGHT',
  'SWITCH': 'SWITCH',
  'DOOR': 'DOOR',
  'FAN_SPEED': 'FAN_SPEED',
};

//Class Sensor
export class Sensor {
  #id;
  #name;
  #data;

  constructor(id, name, data) {

    if (id === 0){
      throw new Error("id can't be equal to 0");
    }

    if (!id){
      throw new Error("No id mentionned");
    }

    if (typeof id !== 'number'){
      throw new TypeError("id must be a number");
    }

    if (!name){
      throw new Error("No name mentionned");
    }

    this.#id = id;
    this.#name = name;
    this.#data = data;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get data() {
    return this.#data;
  }
}

//Class Temperature
export class Temperature extends Sensor {
  constructor(id, name, data) {
    super(id, name, data);
  }
}

//Class Humidity
export class Humidity extends Sensor {
  constructor(id, name, data) {
    super(id, name, data);
  }
}

//Class Light
export class Light extends Sensor {
  constructor(id, name, data) {
    super(id, name, data);
  }
}

//Class Switch
export class Switch extends Sensor {
  constructor(id, name, data) {
    super(id, name, data);
  }
}

//Class Door
export class Door extends Sensor {
  constructor(id, name, data) {
    super(id, name, data);
  }
}

//Class FanSpeed
export class FanSpeed extends Sensor {
  constructor(id, name, data) {
    super(id, name, data);
  }
}

//Class Data
export class Data {
  constructor() {}
}

//Class TimeSeries
export class TimeSeries extends Data {
  #values;
  #labels;

  constructor(values, labels) {
    super();
    this.#values = values;
    this.#labels = labels;
  }

  get values() {
    return this.#values;
  }

  get labels() {
    return this.#labels;
  }

  numberOfValues() {
    return this.#values.length;
  }

  averageValue() {
    let sum = 0;
    for (let i = 0; i < this.numberOfValues(); i++) {
      sum += this.#values[i];
    }
    return sum / this.numberOfValues();
  }

  dateOfLastMeasure() {
    let lastDate = this.#labels[0];
    for (let i = 0; i < this.#labels.length; i++) {
      if (this.#labels[i] > lastDate) {
        lastDate = this.#labels[i];
      }
    }
    return lastDate;
  }
}

//Class Datum
export class Datum extends Data {
  #value;

  constructor(value){
    super();
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}

//Function createSensor
export function createSensor(dataObject) {
  let data = null;
  let sensor;

  if (dataObject.data.value !== undefined) {
    data = new Datum(dataObject.data.value);
  }

  if (dataObject.data.values && dataObject.data.labels) {
    if (!Array.isArray(dataObject.data.values) || !Array.isArray(dataObject.data.labels)) {
      throw new Error("Values or labels Array doesn't exist");
    }
    if (dataObject.data.values.length !== dataObject.data.labels.length) {
      throw new RangeError('Values and labels must have the same length');
    }
    data = new TimeSeries(dataObject.data.values, dataObject.data.labels);
  }

  switch (dataObject.type) {
    case sensorType.TEMPERATURE: sensor = new Temperature(dataObject.id, dataObject.name, data); break;
    case sensorType.HUMIDITY: sensor = new Humidity(dataObject.id, dataObject.name, data); break;
    case sensorType.LIGHT: sensor = new Light(dataObject.id, dataObject.name, data); break;
    case sensorType.SWITCH: sensor = new Switch(dataObject.id, dataObject.name, data); break;
    case sensorType.DOOR: sensor = new Door(dataObject.id, dataObject.name, data); break;
    case sensorType.FAN_SPEED: sensor = new FanSpeed(dataObject.id, dataObject.name, data); break;
    default: throw new Error("type of Sensor is not defined");
  }
  return sensor;
}

//Function createSensors
export function createSensors(dataObject) {
  let sensors = [];
  for (const object of dataObject) {
    sensors.push(createSensor(object));
  }
  return sensors;
}
