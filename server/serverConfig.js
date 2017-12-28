var jwt = require('jsonwebtoken');
module.exports = {
    JWTSecret: '',
    jwtTokenValidateValue: '',
    mailer: {
        from: '',
        to: '',
     },
    getEnvironment: function () {
        return this.environments[process.env.NODE_ENV]
    },
    environments: {
        production: {
            mongo: {
                connection: ''
            },
        },

        staging: {},
        development: {
            mongo: {
                connection: ''
            },
        },
        local: {
            mongo: {
                connection: ''
            },
        }
    },
    createJwt: function(data, config={}) {
        return jwt.sign(data, this.JWTSecret, {
            expiresIn: config.expiresIn ||  '1 day', // if number, it is in seconds
            issuer: 'DAILYX_APP'
        });
    },
}