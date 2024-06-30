const express = require("express");
const Story = require("../db/models/StoryModel"); // Assuming StoryModel is correctly defined in the path

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.story || !req.body.victim) {
      return res
        .status(400)
        .send({ message: "Please provide all the required fields" });
    }
    const newStory = {
      story: req.body.story,
      victim: req.body.victim,
    };
    const createdStory = await Story.create(newStory);
    return res.status(201).json(createdStory); 
  } catch (e) {
    console.error(e.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const stories = await Story.find({});
    return res.status(200).json({
      count: stories.length,
      data: stories,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" }); 
    }
    return res.status(200).json(story);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body.story || !req.body.victim) {
      return res
        .status(400)
        .send({ message: "Please provide all the required fields" });
    }
    const updatedStory = await Story.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStory) {
      return res.status(404).json({ message: "Story not found" });
    }
    return res.status(200).send({ message: "Story successfully updated" });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStory = await Story.findByIdAndDelete(id);
    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found" });
    }
    return res.status(200).send({ message: "Story successfully deleted" });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
