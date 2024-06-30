const express = require("express")
const cors = require("cors")
const router = express.Router();
router.use(cors());

router.get("/join", (req, res) => {
    res.send("Waiting for a user to join the chat room");
})



module.exports = router;