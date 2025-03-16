const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  blocks: [
    {
      block: {
        type: Schema.Types.ObjectId,
        ref: 'Block'
      },
      order: {
        type: Number,
        required: true
      },
      day: {
        type: Number,
        required: true
      },
      note: {
        type: String,
        default: ''
      }
    }
  ],
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
