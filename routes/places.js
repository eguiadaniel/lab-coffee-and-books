'use strict';

const express = require('express');
const router = new express.Router();
const Place = require('./../models/places');

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

module.exports = router;
