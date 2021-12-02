var dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var app = express();
var Annonce = require("./models/annonce");
var User = require("./models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

//const resolvers = require("./graphql/resolvers/index");
const graphqlHttp = require("express-graphql");
const isAuth = require("./middleware/is-auth");

const port = process.env.PORT || 3000;


// Requiring ROUTES
var commentRoutes = require("./routes/comments");
var messageRoutes = require("./routes/messages");
var replyRoutes = require("./routes/replies");
var reviewRoutes = require("./routes/reviews");
var annonceRoutes = require("./routes/annonces");
var userRoutes = require("./routes/users");
var indexRoutes = require("./routes/index");
//graphqlHTTP
var { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/queries");
//GraphQl
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

mongoose.connect("mongodb://127.0.0.1:27017/essai", {
     useNewUrlParser: true });


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); // flash updates
// seedDB(); // seed the database
app.locals.moment = require("moment");


// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Madjid's Secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// passport-local-mongoose config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// currentUser
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/annonces", annonceRoutes);
app.use("/users", userRoutes);
app.use("/annonces/:id/reviews", reviewRoutes);
app.use("/annonces/:id/comments", commentRoutes);
app.use("/annonces/:id/messages", messageRoutes);
app.use("/annonces/:id/messages/:id/replies", replyRoutes);
app.use("/uploads", express.static("uploads"));



// Express listens for requests (Start server)
app.listen(port, () => console.log(`Site des annonces starting on port ${port}!`))


