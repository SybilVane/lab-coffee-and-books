const router = require('express').Router();

const Place = require('./../models/Place.model');

router.get('/map', (req, res, next) => res.render('places/places-map'));

router.get('/list', (req, res, next) => {
  Place.find()
    .then(place => {
      res.render('places/places-list', { place });
      console.log(place);
    })
    .catch(err => console.log(err));
});

router.get('/create', (req, res, next) => res.render('places/new-place'));

router.post('/create', (req, res, next) => {
  const { name, description, lat, lng, type } = req.body;

  const location = {
    type: 'Point',
    coordinates: [lat, lng],
  };

  console.log(req.body);
  Place.create({ name, description, location, type })
    .then(() => res.redirect('/places/map'))
    .catch(err => console.log(err));
});

router.get('/map', (req, res, next) => res.render('places/places-map'));

module.exports = router;

/**
 * CRUD
 * 1. Crear modelo
 * 2. Crear un endpoint que pinte un formulario
 * 2.1 Crear hbs con action, method, e inputs con name
 * 3. Ese formulario hace post al backend
 * 3.1 comprobar que el req.body envia los datos correctos
 * 4. El endpoint del backend hace Modelo.create()
 * 4.1 Asegurarse que los datos del req.body coinciden con los del modelo y si no convertirlos
 *
 * Repetir para .find() .update() .delete()
 */
