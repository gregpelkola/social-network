const express = require('express');
const router = express.Router();
const ThoughtController = require('../../controllers/thought-controller');

// Define the routes for GET all Thoughts and POST a new Thought
router.route('/').get(ThoughtController.getAllThoughts).post(ThoughtController.createThought);

// Define the routes for GET, PUT, and DELETE Thoughts
router.route('/:thoughtId').get(ThoughtController.getThoughtsById).put(ThoughtController.updateThoughtById).delete(ThoughtController.deleteThought);

// Define the route for POST reaction to a Thought
router.route('/:thoughtId/reactions').post(ThoughtController.createReaction);

// Define the route for DELETE reaction to a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(ThoughtController.deleteReaction);

module.exports = router;
