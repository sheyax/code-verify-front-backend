const router = require("express").Router();

const User = require("../models/user");
const jwt = require("jsonwebtoken");

var token = ''
router.post("/register", async(req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    //save user
    result = await user.save();
    const { password, ...data } = await result.toJSON();
    res.send(data);
});

router.post("/login", async(req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (username !== "" && password !== "") {
        const user = await User.findOne({ username });

        console.log(user);
        if (!user) {
            res.status(404).send({ message: "user does not exist" });
            console.log("wrong username");
            return;
        }
        if (req.body.password !== user.password) {
            res.status(400).send({ message: "invalid password" });
            console.log("wrong password");
        }

        //Jwt signing and cookies
        const tokener = await jwt.sign({
                id: user._id,
                username: user.username,
            },
            "secretkey"
        );



        //cookies.................................//
        res.cookie("newjwt", false);
        res.cookie("jwt", tokener, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000, //1 day
        });

        //.......................................//
        res.status(200).send({ message: "success", tokener });
        console.log("sucessful login");
    }
});

router.get("/user", (req, res) => {
    const cookie = req.cookies["jwt"]

    //console.log(cookie, "cookie");
    res.send(cookie);
    if (cookie) {
        const claims = jwt.verify(cookie, "secretkey");

        if (!claims) {
            console.log("cannot authenticate");
            res.status(400).send({
                message: "cannot authenticate ",
            });
        }
    }
});

module.exports = router;