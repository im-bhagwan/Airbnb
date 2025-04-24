        
        const User = require("../models/user");

        module.exports.renderSignupForm = (req, res) => {
            res.render("users/signup.ejs");
        };

        module.exports.signup = async (req, res) => {
            try{
                let { username, email, password } = req.body;
                const neUser = new User({ email , username });
                const registeredUser = await User.register(neUser, password);
                console.log(registeredUser);
                req.login(registeredUser, (err) => {
                    if(err) {
                        return next(err);
                    }
                        req.flash("success", "Welcome to WanderLust");
                        res.redirect("/listings");
                });
                    
            } catch(e) {
                req.flash("error", e.message);
                res.redirect("/signup");
            }
        };

        module.exports.renderLoginForm = (req, res) => {
            res.render("users/login.ejs", { user: req.user });
        };

        module.exports.login = async (req, res,) => {
            req.flash("success", "Welcome Back to WanderLust!");
            let redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
        };

        module.exports.logout = (req, res, next) => {
            req.logOut((err) => {
                if(err) {
                    return next(err);
                }
                req.flash("success", "You Are Logged Out!");
                res.redirect("/listings");
            })
        };