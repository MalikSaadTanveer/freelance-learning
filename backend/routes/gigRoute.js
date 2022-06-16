const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
    createGig,
    editGig,
    getUserGigs}  = require('../controllers/gigController')
const router = express.Router();

const upload = require("../middleware/multer");

router
    .route('/gigs/new')
    .post(isAuthenticatedUser,createGig);

router
    .route('/gigs/:id')
    .put(isAuthenticatedUser,upload.single('gigImages'),editGig)
    

router
    .route('/gigs/me')
    .get(isAuthenticatedUser,getUserGigs)

module.exports = router;
