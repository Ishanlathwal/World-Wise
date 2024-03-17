const express = require("express");
const router = express.Router();
const CITYSCHEMA = require("../Schema/Cities-Schema");

router.get("/", async (req, res) => {
  try {
    const data = await CITYSCHEMA.find();

    res.status(200).json({ data });
  } catch (err) {
    console.log(err.message);
  }
});
// router.get("/:id", async (req, res) => {
//   try {
//     const data = await CITYSCHEMA.findOne({ userId: req.params.id });

//     res.status(200).json({ data });
//   } catch (err) {
//     console.log(err.message);
//   }
// });
router.get("/:id", async (req, res) => {
  try {
    const data = await CITYSCHEMA.findOne({ _id: req.params.id });

    res.status(200).json({ data });
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await CITYSCHEMA.findOne({ userId: req.params.id });

    res.status(200).json({ data });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await CITYSCHEMA.create(req.body);

    res.status(200).json({ data });
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await CITYSCHEMA.findByIdAndDelete(req.params.id);

    res.status(200).json({ data });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
