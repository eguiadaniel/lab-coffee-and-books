'use strict';

const express = require('express');
const router = new express.Router();
const Place = require('./../models/places');

router.get('/video/:id', (req, res, next) => {
  //res.set('Content-Type', 'text/plain');
  //res.set('Content-Type', 'application/vnd.ms-excel');
  res.set('Content-Type', 'text/plain');
  res.send('{"Hola":5}');
});

router.get('/create', (req, res, next) => {
  res.render('place/new');
});

router.post('/create', (req, res, next) => {
  const data = req.body;
  Place.create({
    name: data.name,
    type: data.type,
    location: {
      coordinates: [data.longitude, data.latitude]
    }
  })
    .then((place) => {
      res.redirect(`/place/${place._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/search', (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render('place/results', { places: places });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      console.log('whyyyyyy');
      res.render('place/single', { place });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/update', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('place/update', { place: place });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/update', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Place.findByIdAndUpdate(id, {
    name: data.name,
    type: data.type,
    location: {
      coordinates: [data.longitude, data.latitude]
    }
  })
    .then((place) => {
      res.redirect(`/place/${place._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('place/confirm-deletion', { place: place });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndDelete(id)
    .then((place) => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
