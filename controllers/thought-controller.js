const { Thought, user, reaction } = require('../models');
const {Types} = require('mongoose');

// Thought controller
const ThoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by its _id
    async getThoughtsById(req, res) {
        try {
            const thought = await Thought.findOne({_id:req.params.thoughtId});
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Update a thought by its _id
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
                );
                thought ? res.json(thought) : res.status(404).json({message: 'Reaction not found"'});
            } catch (e) {
                res.status(500).json(e);
            }
        },
        
    // Delete a reaction by its _id
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
                );
                thought ? res.json(thought) : res.status(404).json({message: 'Thought not found'});
            } catch (e) {
                res.status(500).json(e);
            }
        },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
    
module.exports = ThoughtController;