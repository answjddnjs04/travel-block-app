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
      },
      transportationToNext: {
        type: {
          type: String,
          enum: ['walking', 'driving', 'transit', 'taxi', 'none'],
          default: 'none'
        },
        duration: {
          type: Number,
          default: 0
        },
        cost: {
          type: Number,
          default: 0
        }
      }
    }
  ],
  tags: {
    type: [String],
    default: []
  },
  // 공동 작업 가능한 사용자 목록 (향후 사용자 인증 구현 후 활성화)
  collaborators: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
