module.exports = (app) => {
    // in case of server side rendering being required
    app.get("*", (req, res, err) => {
        // SSR requests
        if (err) {
            res.send("No server side rendering on this app yet - go back to route url and refresh!");
        }
    });
};