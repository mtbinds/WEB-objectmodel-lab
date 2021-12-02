/*
 *@Author Madjid Taoualit
 * M1-IWOCS-2021
 */
/* Coded using  ECMASript 6 (class) Pattern */

const fs = require('fs').promises;

import { version } from '.';

import { Temperature } from '.';
import { Humidity } from '.';
import { Light } from '.';
import { Switch } from '.';
import { Door } from '.';
import { FanSpeed } from '.';
import { TimeSeries } from '.';

import { createSensor } from '.';
import { createSensors } from '.';

let data;
beforeAll(async () => {
  data = await fs.readFile('./resources/sensors_data.json', {
    encoding: 'utf8',
  });
  data = JSON.parse(data);
});

describe('Sensor Model Tests', () => {
  describe('Basic Tests', () => {
    test('Version Number from the Model', () => {
      expect(version()).toBe('1.0.0');
    });
  });

  describe('Sensors with data', () => {
    test('The Number of Sensors', () => {
      expect(data.length).toBe(6);
    });
  });


  describe('The First Sensor', () => {
    test('ID of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor.id).toBe(1994);
    });

    test('The Name of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor.name).toBe("Desk's Temperature");
    });

    test('The Type of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor instanceof Temperature).toBe(true);
    });

    let timeSeries = new TimeSeries([17,17,16,15,17,17,17,19,19], [
      "2021-02-16T23:00:00.000Z",
      "2021-02-17T00:00:00.000Z",
      "2021-02-17T01:00:00.000Z",
      "2021-02-17T02:00:00.000Z",
      "2021-02-17T03:00:00.000Z",
      "2021-02-17T04:00:00.000Z",
      "2021-02-17T05:00:00.000Z",
      "2021-02-17T06:00:00.000Z",
      "2021-02-17T07:00:00.000Z"
    ]);

    test('The Values/labels of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor.data).toEqual(timeSeries);
    });

    test('The Values of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor.data.values).toEqual([17,17,16,15,17,17,17,19,19]);
    });
    test('The Labels of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor.data.labels).toEqual([
        "2021-02-16T23:00:00.000Z",
        "2021-02-17T00:00:00.000Z",
        "2021-02-17T01:00:00.000Z",
        "2021-02-17T02:00:00.000Z",
        "2021-02-17T03:00:00.000Z",
        "2021-02-17T04:00:00.000Z",
        "2021-02-17T05:00:00.000Z",
        "2021-02-17T06:00:00.000Z",
        "2021-02-17T07:00:00.000Z"
      ]);
    });

    test('Average Value of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor.data.averageValue()).toBe(17.11111111111111);
    });

    test('The Date of The Last Measure of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[0];
      expect(sensor.data.dateOfLastMeasure()).toBe("2021-02-17T07:00:00.000Z");
    });
  });

  describe('The Second Sensor', () => {
    test('ID of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[1];
      expect(sensor.id).toBe(1995);
    });

    test('The Name of The Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[1];
      expect(sensor.name).toBe("Room's Door");
    });

    test('The Type of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[1];
      expect(sensor instanceof Door).toBe(true);
    });

    test('The Value of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[1];
      expect(sensor.data.value).toBe(0);
    });
  });

  describe('The Third Sensor', () => {
    test('ID of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor.id).toBe(1996);
    });

    test('The Name of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor.name).toBe("Engine's FAN");
    });

    test('The Type of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor instanceof FanSpeed).toBe(true);
    });

    let timeSeries = new TimeSeries([1000,1520,2032,1920,1766,1401], [
      "2021-02-17T01:00:00.000Z",
      "2021-02-17T01:05:00.000Z",
      "2021-02-17T01:10:00.000Z",
      "2021-02-17T01:15:00.000Z",
      "2021-02-17T01:20:00.000Z",
      "2021-02-17T01:25:00.000Z"
    ]);
    test('The Values/Labels of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor.data).toEqual(timeSeries);
    });

    test('The Values of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor.data.values).toEqual([1000,1520,2032,1920,1766,1401]);
    });
    test('The Labels of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor.data.labels).toEqual([
        "2021-02-17T01:00:00.000Z",
        "2021-02-17T01:05:00.000Z",
        "2021-02-17T01:10:00.000Z",
        "2021-02-17T01:15:00.000Z",
        "2021-02-17T01:20:00.000Z",
        "2021-02-17T01:25:00.000Z"
      ]);
    });

    test('The Average Value of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor.data.averageValue()).toBe(1606.5);
    });

    test('The Date of Last Measure of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[2];
      expect(sensor.data.dateOfLastMeasure()).toBe("2021-02-17T01:25:00.000Z");
    });
  });

  describe('The Fourth Sensor', () => {
    test('ID of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[3];
      expect(sensor.id).toBe(1997);
    });

    test('The Name of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[3];
      expect(sensor.name).toBe("Exterior Humidity");
    });

    test('The Type of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[3];
      expect(sensor instanceof Humidity).toBe(true);
    });

    test('The Value of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[3];
      expect(sensor.data.value).toBe(1);
    });
  });

  describe('The Fifth Sensor', () => {
    test('ID of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor.id).toBe(1998);
    });

    test('The Name of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor.name).toBe("Kitcken's Light");
    });

    test('The Type of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor instanceof Light).toBe(true);
    });

    let timeSeries = new TimeSeries([21,25,23,26,26], [
      "2021-02-17T20:02:00.000Z",
      "2021-02-17T20:04:00.000Z",
      "2021-02-17T21:06:00.000Z",
      "2021-02-17T21:08:00.000Z",
      "2021-02-17T22:10:00.000Z"
    ]);

    test('The Values/Labels of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor.data).toEqual(timeSeries);
    });

    test('The Values of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor.data.values).toEqual([21,25,23,26,26]);
    });
    test('The Labels of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor.data.labels).toEqual([
        "2021-02-17T20:02:00.000Z",
        "2021-02-17T20:04:00.000Z",
        "2021-02-17T21:06:00.000Z",
        "2021-02-17T21:08:00.000Z",
        "2021-02-17T22:10:00.000Z"
      ]);
    });

    test('The Average Value of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor.data.averageValue()).toBe(24.2);
    });

    test('The Date of the Last Measure of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[4];
      expect(sensor.data.dateOfLastMeasure()).toBe("2021-02-17T22:10:00.000Z");
    });
  });

  describe('The Sixth Sensor', () => {
    test('id of sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[5];
      expect(sensor.id).toBe(1999);
    });

    test('The Name of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[5];
      expect(sensor.name).toBe("Garage's Light Switcher");
    });

    test('The Type of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[5];
      expect(sensor instanceof Switch).toBe(true);
    });

    test('The Value of the Sensor', () => {
      let sensors = createSensors(data);
      let sensor = sensors[5];
      expect(sensor.data.value).toBe(2);
    });
  });

  describe('The Sensor Without Data', () => {
    test('No ID is Mentionned', () => {
      let tab = {
        "name": "Desk's Temperature",
        "type": "TEMPERATURE",
        "data": {
          "values": [17,17,16,15,17,17,17,19,19],
          "labels": [
            "2021-02-16T23:00:00.000Z",
            "2021-02-17T00:00:00.000Z",
            "2021-02-17T01:00:00.000Z",
            "2021-02-17T02:00:00.000Z",
            "2021-02-17T03:00:00.000Z",
            "2021-02-17T04:00:00.000Z",
            "2021-02-17T05:00:00.000Z",
            "2021-02-17T06:00:00.000Z",
            "2021-02-17T07:00:00.000Z"
          ]
        }
      };
      expect(() => createSensor(tab)).toThrow("No id mentionned");
    });

    test('The ID is not a Number', () => {
      let tab = {
        "id" : "1234",
        "name": "Desk's Temperature",
        "type": "TEMPERATURE",
        "data": {
          "values": [17,17,16,15,17,17,17,19,19],
          "labels": [
            "2021-02-16T23:00:00.000Z",
            "2021-02-17T00:00:00.000Z",
            "2021-02-17T01:00:00.000Z",
            "2021-02-17T02:00:00.000Z",
            "2021-02-17T03:00:00.000Z",
            "2021-02-17T04:00:00.000Z",
            "2021-02-17T05:00:00.000Z",
            "2021-02-17T06:00:00.000Z",
            "2021-02-17T07:00:00.000Z"
          ]
        }
      };
      expect(() => createSensor(tab)).toThrow("id must be a number");
    });

    test('ID equals to 0', () => {
      let tab = {
        "id" : 0,
        "name": "Desk's Temperature",
        "type": "TEMPERATURE",
        "data": {
          "values": [17,17,16,15,17,17,17,19,19],
          "labels": [
            "2021-02-16T23:00:00.000Z",
            "2021-02-17T00:00:00.000Z",
            "2021-02-17T01:00:00.000Z",
            "2021-02-17T02:00:00.000Z",
            "2021-02-17T03:00:00.000Z",
            "2021-02-17T04:00:00.000Z",
            "2021-02-17T05:00:00.000Z",
            "2021-02-17T06:00:00.000Z",
            "2021-02-17T07:00:00.000Z"
          ]
        }
      };
      expect(() => createSensor(tab)).toThrow("id can't be equal to 0");
    });

    test('The Type of the Sensor is not defined', () => {
      let tab = {
        "id" : 1994,
        "name": "Desk's Temperature",
        "type": "TEMPERATUREBUREAU",
        "data": {
          "values": [17,17,16,15,17,17,17,19,19],
          "labels": [
            "2021-02-16T23:00:00.000Z",
            "2021-02-17T00:00:00.000Z",
            "2021-02-17T01:00:00.000Z",
            "2021-02-17T02:00:00.000Z",
            "2021-02-17T03:00:00.000Z",
            "2021-02-17T04:00:00.000Z",
            "2021-02-17T05:00:00.000Z",
            "2021-02-17T06:00:00.000Z",
            "2021-02-17T07:00:00.000Z"
          ]
        }
      };
      expect(() => createSensor(tab)).toThrow("type of Sensor is not defined");
    });

    test('No Name is mentionned', () => {
      let tab = {
        "id" : 1994,
        "type": "TEMPERATURE",
        "data": {
          "values": [17,17,16,15,17,17,17,19,19],
          "labels": [
            "2021-02-16T23:00:00.000Z",
            "2021-02-17T00:00:00.000Z",
            "2021-02-17T01:00:00.000Z",
            "2021-02-17T02:00:00.000Z",
            "2021-02-17T03:00:00.000Z",
            "2021-02-17T04:00:00.000Z",
            "2021-02-17T05:00:00.000Z",
            "2021-02-17T06:00:00.000Z",
            "2021-02-17T07:00:00.000Z"
          ]
        }
      };
      expect(() => createSensor(tab)).toThrow("No name mentionned");
    });

    test('Values/Labels have different length', () => {
      let tab = {
        "id" : "1994",
        "name": "Desk's Temperature",
        "type": "TEMPERATURE",
        "data": {
          "values": [17,17,16,15],
          "labels": [
            "2021-02-16T23:00:00.000Z",
            "2021-02-17T00:00:00.000Z",
            "2021-02-17T01:00:00.000Z",
            "2021-02-17T02:00:00.000Z",
            "2021-02-17T03:00:00.000Z",
            "2021-02-17T04:00:00.000Z",
            "2021-02-17T05:00:00.000Z",
            "2021-02-17T06:00:00.000Z",
            "2021-02-17T07:00:00.000Z"
          ]
        }
      };
      expect(() => createSensor(tab)).toThrow(RangeError);
    });

    test('Values are not an Array', () => {
      let tab = {
        "id" : "1994",
        "name": "Desk's Temperature",
        "type": "TEMPERATURE",
        "data": {
          "values": 17,
          "labels": ["2021-01-19T08:00:00.000Z", "2021-01-19T09:00:00.000Z", "2021-01-19T10:00:00.000Z", "2021-01-19T11:00:00.000Z", "2021-01-19T12:00:00.000Z", "2021-01-19T13:00:00.000Z", "2021-01-19T14:00:00.000Z", "2021-01-19T15:00:00.000Z", "2021-01-19T16:00:00.000Z"]
        }
      };
      expect(() => createSensor(tab)).toThrow(Error);
    });

    test('Labels are not an Array', () => {
      let tab = {
        "id" : "1234",
        "name": "Desk's Temperature",
        "type": "TEMPERATURE",
        "data": {
          "values": [17,17,16],
          "labels": "2021-02-16T23:00:00.000Z"
        }
      };
      expect(() => createSensor(tab)).toThrow(Error);
    });
  });

});
