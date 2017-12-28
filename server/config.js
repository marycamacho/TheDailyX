module.exports = {
    getEnvironment: function () {
        return this.environments[process.env.NODE_ENV]
    },

    environments:{
        development: {
        },
        local:{
        },
        production: {
        },

    },
    templateEngine: 'handlebars',
    apiMessages: {
        errorSomethingWrong: 'Something went wrong',
        errorParameterNotSpecified: '#1# not specified',
        errorRecordNotFound: '#1# not found',
          errorFacebookUserNotFoundSignin: 'Sorry we can\'t find your user account. We apologize for the inconvenience.',
        errorUserWithEmailNotFound: 'User associated with this email not found',
        errorFacebookEmailNotAvailable: 'Could not get email from Facebook account. Please, specify your email address',
        errorPermissions: 'Resource access denied',
    },

};
