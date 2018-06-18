module.exports = (app) => {
    // home
    app.get("/", (req, res) => {
        res.send("homepage");
    });
};