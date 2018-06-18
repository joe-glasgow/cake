module.exports = function (env) {
    // If the development environment is not detected
    // we throw an error telling the user
    // what the correct params are.
    try {
        if (['dev', 'prod', 'server'].indexOf(env) === -1) {
            throw new Error('\'' + env + "' is not valid env flag.  Please pass '--env dev' , '--env server',  '--env prod'.")
        }
    } catch (e) {
        return console.error(e)
    }

    return require('./webpack/' + env + '.js')({ env: env });
};