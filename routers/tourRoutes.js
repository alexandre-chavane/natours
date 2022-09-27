const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkId);

// Create a checkBody middleware
// Check if body contains the name and price Property
// If not send 400 (Bad request)
// Add it to the post handler stack
// router.param('name','price')
router.route('/tour-stats').get(tourController.getTourStats);

// Business problem
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
// router.route('/').post(tourController.checkBody, tourController.createTour).get(tourController.getAllTours);
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/').post(tourController.createTour).get(tourController.getAllTours);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
