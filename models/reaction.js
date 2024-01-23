const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // add a validator that checks the length of the 280 character reaction
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    // associate the reaction with a username and date
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleDateString()
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema