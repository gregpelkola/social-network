const { User } = require('../models');

// user controller
const UserController = {
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },
    
    // Get a single user by its _id and populated thought and friend data
    getUserById(req, res) {
        User.findById(req.params.userId)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },
    
    // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },
    
    // Update a user by its _id
    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },
    
    // Delete a user by its _id
    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        })
        .catch(err => res.status(500).json(err));
    },
    
    // Remove a user's associated thoughts when deleted
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId} },
            { new: true }
            )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
        },
        
        // Remove a user's associated friends when deleted
        removeFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
                )
                .then((dbUserData) => {
                    if (!dbUserData) {
                        return res.status(404).json({ message: "No user with this id!" });
                    }
                    
                    // remove friend from user's friend list
                    const removed = !dbUserData.friends.includes(params.friendId);
                    if (removed) {
                        res.json({ message: "Friend removed successfully!", dbUserData });
                    } else {
                        res.json(dbUserData);
                    }
                })
                .catch((err) => res.status(400).json(err));
            },
        };



module.exports = UserController;