const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

//zod schema
const signupBody = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
});
const signinBody = zod.object({
  username: zod.string().email,
  password: zod.string(),
});
const updatBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})
//signup rout
router.post("/signup", async (req, res) => {
  const body = req.body;
  //why using {} for here , bcz its there are many field are will come , destructuring sentences
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Email already taken / Incorrect input",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken /Incorrect inputs",
    });
  }

  const dbUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

//signin route
router.post("/signin", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    res.status(404).json({
      message: "Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });

  //update router
  router.put("/",authMiddleware,async(req,res)=>{
    
  })

});

module.exports = router;
