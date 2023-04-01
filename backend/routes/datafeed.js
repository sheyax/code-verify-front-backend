const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Driver = require("../models/driver");
var ObjectId = require("mongoose").Types.ObjectId;

//get all drivers

router.get("/drivers", async (req, res) => {
  await Driver.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error retrieving data" + JSON.stringify(err, undefined, 2));
    }
  });
});

//..................Create a new trip

router.put("/trip/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("no record with given id: " + req.params.id);
  }

  var newTrip = req.body;

  console.log(newTrip);

  try {
    let driver = await Driver.findById(req.params.id);
    driver.dailyTrips.push(newTrip);
    Driver.findByIdAndUpdate(
      req.params.id,
      { $set: driver },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.send({
            status: "success",
            docs,
          });
        } else {
          console.log(
            "Error updating the record" + JSON.stringify(err, undefined, 2)
          );
        }
      }
    );
  } catch (err) {
    res.send({
      status: "Failed",
      message: "could not update trip",
    });
  }
});

module.exports = router;
