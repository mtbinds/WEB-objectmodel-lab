
import { version } from ".";
import  { data }  from '../resources/sensors_data';
import  { Enumeration, Sensor }  from './index.js';


var donnees = [];
var myEnum = new Enumeration(['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'SWITCH', 'DOOR', 'FAN_SPEED']);
for (var i of myEnum) { console.log("-", i, ": ", myEnum[i]); }


describe('Sensor model tests', () => {
  describe('Dummy tests', () => {
    test('data is loaded with 13 elements',() => {
      expect(data.length).toBe(13);
    });
    test('version number from the model',() => {
      expect(version()).toBe('1.0.0');
    });
  });

  /* TESTS UNITAIRES */
  describe('Récupérer les données de data', () => {
    // Le plus de cas non conformes de sensors sont testés en insérant les données dans le tableau.
    // Voir sensors_data.js pour voir les différents cas étudiés
    test('Créer un tableau contenant les sensors conformes de data',() => {
      let sensor;
      // Si deux sensors ont le même id, on ne garde que le premier
      let idUnique = [];
      let i = 0;
      for(let dat of data) {
        if(dat.id && dat.name && dat.data && dat.type && (Object.keys(myEnum).includes(dat.type))) {
          sensor = Sensor.createSensor(dat.id, dat.name, dat.data, dat.type);
          // La fonction estEnNorme() de la classe vérifie que les valeurs sont cohérentes.
          // Si ce n'est pas le cas on ne rajoute pas le sensor dans le tableau.
          if(sensor.estEnNorme() && !(idUnique.includes(sensor.id))) {
            donnees[i] = sensor;
            idUnique[i] = sensor.id;
            i++;
          }
        }
      }
      expect(donnees.length).toBe(6);
    });
  });

  describe('Les fonctions utiles', () => {
    test('get name() du premier sensor',() => {
      expect(donnees[0].name).toBe('Température Bureau');
    });
    test('set val() du datum Porte du garage',() => {
      donnees[1].data.value = 1;
      expect(donnees[1].data.value).toBe(1);
    });
    test('nombreDeValeurs() du ventilateur de bureau',() => {
      expect(donnees[2].data.nombreDeValeurs()).toBe(6);
    });
    test('valeurMoyenne() du ventilateur de bureau',() => {
      // Le résultat est différent selon l'endroit où le test est effectué.
      // npm : Wed Feb 10 2021 10:52:00 GMT+0200 (GMT+02:00)
      // git : Wed Feb 10 2021 10:52:00 GMT+0000 (Coordinated Universal Time)
      console.log(donnees[2].data.derniereMesure().toString());
      expect(donnees[2].data.valeurMoyenne()).toBe(1774.5);
    });
  });

});
