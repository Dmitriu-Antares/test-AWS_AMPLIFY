const environment = {
    development: {
        apiPath: `http://localhost:3200/`,
        //devTools: true
    },
    production: {
        apiPath: `prod`,
        //devTools: false
    }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({}, environment);