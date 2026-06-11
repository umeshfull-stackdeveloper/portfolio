const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Technologies should be a non-empty array',
      },
    },
    githubLink: {
      type: String,
      trim: true,
      default: '',
    },
    liveLink: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
