module.exports = (app) => {
    // in case of server side rendering being required
    app.get("/", (req, res) => {
        // SSR requests
        res.send("homepage");
    });
};