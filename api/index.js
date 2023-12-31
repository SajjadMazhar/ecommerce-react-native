const express = require("express")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
const User = require("./models/user.models")


const app = express();
const port = 8000;
const cors = require("cors")
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const jwt = require("jsonwebtoken");

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // return console.log(req.body)
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email); // Debugging statement
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new user
        const newUser = new User({ name, email, password });

        // Generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user to the database
        await newUser.save();

        // Debugging statement to verify data
        console.log("New User Registered:", newUser);

        // Send verification email to the user
        // Use your preferred email service or library to send the email
        // sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error during registration:", error); // Debugging statement
        res.status(500).json({ message: "Registration failed" });
    }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        //Find the user witht the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        //Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email Verificatioion Failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user!
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        //generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});


mongoose.connect("mongodb://localhost:27017/ecommerce_native", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongodb");
    app.listen(port, () => console.log("server started at", port))
}).catch(err => console.log(err.message))