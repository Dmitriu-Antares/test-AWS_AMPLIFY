const environment = {
    development: {
        apiPath: `dev`,
        //devTools: true
    },
    production: {
        apiPath: `prod`,
        //devTools: false
    }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({}, environment);