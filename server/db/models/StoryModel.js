const mongoose = require("mongoose");

const StorySchema = mongoose.Schema(
  {
    story: {
      type: String,
      required: true,
    },
    victim: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", StorySchema);

module.exports = Story;
