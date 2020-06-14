const express = require('express')
const router = express.Router()

const allCouriers = require('../controllers/AllCourierController')
const addCouriers = require('../controllers/AddCourierController')
const lookupCouriers = require('../controllers/LookupCourierController')
const { updateCouriers, pickupCouriers, dropCouriers } = require('../controllers/UpdateCourierController')
const removeCouriers = require('../controllers/RemoveCourierController')

// defining all the routes for the courier API
router.get('/', allCouriers) // gets all the couriers
router.post('/', addCouriers) // add the new courier
router.get('/lookup', lookupCouriers) // lookup the couriers with mentioned available capacity
router.put('/:id', updateCouriers) // update the courier
router.put('/pickup/:id', pickupCouriers) // if pickup new courier, decreasing the available capacity
router.put('/drop/:id', dropCouriers) // if drop off courier, increasing the available capacity
router.delete('/:id', removeCouriers) // remove the mentioned courier

module.exports = router;