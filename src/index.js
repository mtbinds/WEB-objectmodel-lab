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

/* Adding export class Sensor with it's constructor/getters/setters & createSensor() method  */

export class Sensor {

	constructor(id, name, data) {
		this.id = id;
		this.name = name;
		if(data.values && data.labels) { this.data = new TimeSeries(data.values, data.labels); }
		else if((data.value || data.value == 0) && typeof data.value != undefined) { this.data = new Datum(data.value); }
		else { this.data = new Data(); }
	}

	get id() { return this._id || 0; }
	set id(val) { this._id = val; }
	get name() { return this._name || 0; }
	set name(val) { this._name = val; }
	get data() { return this._data || 0; }
	set data(val) { this._data = val; }

	static createSensor(id, name, data, type) {
		switch(type) {
			case myEnum.TEMPERATURE: return new Temperature(id, name, data);
			case myEnum.HUMIDITY: return new Humidity(id, name, data);
			case myEnum.LIGHT: return new Light(id, name, data);
			case myEnum.SWITCH: return new Switch(id, name, data);
			case myEnum.DOOR: return new Door(id, name, data);
			case myEnum.FAN_SPEED: return new Fan_Speed(id, name, data);
		}
	}
}

/* Adding export class Temperature extending class Sensor with it's constructor and estEnNorme() function */

export class Temperature extends Sensor {

  // La température est exprimée en degrés et ne peut pas aller en dessous du zéro absolu.

  constructor(id, name, data) {
    super(id,name,data);
  }

  estEnNorme() {
    if(this.data.values && this.data.labels) {
      for(let val of this.data.values) {
        if(!(val >= -173)) { return false; }
      }
    }
    return true;
  }
}

/* Adding export class Humidity extending class Sensor with it's constructor & boolean function estEnNorme() */

export class Humidity extends Sensor {
  // L'humidité est exprimé en %.
  constructor(id, name, data) {
    super(id,name,data);
  }

  estEnNorme() {
    if(this.data.values && this.data.labels) {
      for(let val of this.data.values) {
        if(!(val >= 0 && val <= 100)) { return false; }
      }
    }
    return true;
  }
}

/* Adding export class Light extending class Sensor with it's constructor & boolean function estEnNorme() */

export class Light extends Sensor {

  // La lumière ici s'exprime en lux, unité ne pouvant pas être négative.
  constructor(id, name, data) {
    super(id,name,data);
  }

  estEnNorme() {
    if(this.data.values && this.data.labels) {
      for(let val of this.data.values) {
        if(!(val >= 0)) { return false; }
      }
    }
    return true;
  }
}

/* Adding export class Switch extending class Sensor with it's constructor & boolean function estEnNorme() */

export class Switch extends Sensor {

  // 0 pour éteint, 1 pour allumé.
  constructor(id, name, data) {
    super(id,name,data);
  }

  estEnNorme() {
    if(!(this.data.value == 0 || this.data.value == 1 || typeof this.data.value == undefined)) { return false; }
    return true;
  }
}

/* Adding export class Door extending class Sensor with it's constructor & boolean function estEnNorme() */

export class Door extends Sensor {
  // 0 pour fermé, 1 pour ouvert.
  constructor(id, name, data) {
    super(id,name,data);
  }

  estEnNorme() {
    if(!(this.data.value == 0 || this.data.value == 1 || typeof this.data.value == undefined)) { return false; }
    return true;
  }
}

/* Adding export class Fan_Speed extending class Sensor with it's constructor & boolean function estEnNorme() */

export class Fan_Speed extends Sensor {

  // Exprimé en t/s, ne peut pas être négatif.
  constructor(id, name, data) {
    super(id,name,data);
  }

  estEnNorme() {
    if(this.data.values && this.data.labels) {
      for(let val of this.data.values) { if(val >= 0) { return true; } }
    }
    return false;
  }
}

/* Adding empty class Data  */

export class Data {

}
