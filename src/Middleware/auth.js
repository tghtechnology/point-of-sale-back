export const isAuthenticated = (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated() == false) {
        console.log(isAuthenticated)
        return next();
    } else {
    res.status(403).json({ message: "No autorizado" })
    }
    //res.redirect('/login');
}
