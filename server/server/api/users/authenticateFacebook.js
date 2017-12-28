var path = require('path'),
    User = require(path.resolve('./src/models/user')),

    bcrypt = require('bcrypt'),
    util = require(path.resolve('./server/util')),
    _ = require('lodash'),
    uuid = require('node-uuid'),
    mime = require('mime'),
    config = require(path.resolve('./config')),
    serverConfig = require(path.resolve('./serverConfig')),
    async = require('async'),
    Q = require('q'),
    request = require('request');
module.exports = function (methodName) {

    return function (req, res, next) {
        // return next({'clientMessage': 'errorFieldMissing', 'messageData': {'#1#': 'Email'}});

        var type = req.body.type;
        if (!req.body.accessToken) {
            return next({'clientMessage': 'errorParameterNotSpecified', 'messageData': {'#1#': 'accessToken'}});
        }
        var accessToken = req.body.accessToken;
        // Validate the social token with Facebook
        getUserProfileData(type, accessToken).then(function (profile) {
            var query = {};

            query[type.charAt(0).toUpperCase() + type.slice(1) + '.ProfileID'] = profile.id;
            User.findOne(query).select("+jwtTokenHash +Facebook").lean().exec(function (err, user) {
                if (err)  return next(err);
                if (methodName == 'signup') {
                    if (!user) { /* if user is not found, create one*/
                        if (req.body.email) {
                            req.body.email = req.body.email.trim()
                            profile.email = req.body.email;
                        }
                        if (_.isUndefined(profile.email) || !profile.email) {
                            return next({'clientMessage': 'errorFacebookEmailNotAvailable', 'errorCode': 13});
                        }
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(serverConfig.jwtTokenValidateValue, salt, function (err, jwtTokenHash) {
                                req.body = {
                                    Facebook: {
                                        ProfileID: profile.id,
                                        Location: profile.location,
                                    },
                                    FirstName: profile.first_name,
                                    LastName: profile.last_name,
                                    Email: profile.email,
                                    jwtTokenHash: jwtTokenHash,
                                }
                                require(path.resolve('./server/api/users/create'))()(req, res).then(function (userRecord) {

                                }).catch(function (error) {
                                    return next(error);
                                });
                            })
                        });


                    } else {
                        if (_.isUndefined(user.password) && !_.isUndefined(user.Facebook)) {
                            return next({'clientMessage': 'error ', 'errorCode': 11});
                        } else if (!_.isUndefined(user.password) && _.isUndefined(user.Facebook)) {
                            return next({'clientMessage': 'error ', 'errorCode': 11});
                        } else {
                            return next({'clientMessage': 'errorUserAlreadyExistEmail', 'errorCode': 11});
                        }
                    }
                } else { /*signin method*/
                    if (!user) { /* if user is not found with Facebook token, return error*/

                        return next({
                            'status': 404, 'clientMessage': 'errorFacebookUserNotFoundSignin', 'errorCode': 10
                        });
                    }

                    res.send({
                        'token': serverConfig.createJwt({
                            'UserID': util.HexUUIDToBase64(user._id.toString('hex')),
                            'FirstName': user.FirstName,
                            'LastName': user.LastName,
                            'Email': user.email,
                            'Roles': user.Roles,
                            'jwtTokenHash': user.jwtTokenHash
                        }),
                        'User': _.omit(user, ['Facebook', 'jwtTokenHash']),
                    });
                }
            }).catch(function (error) {
                return next(error);
            });

        }).catch(function (error) {
            return next(error);
        });


        function getUserProfileData(type, accessToken) {
            return Q.Promise(function (resolve, reject, notify) {
                // Send a GET request to Facebook with the token as query string
                request({
                        url: config[type].requestDataUrl + '/me',
                        qs: {
                            access_token: accessToken,
                            metadata: 1,
                            fields: 'location, name, email, id, gender, picture.width(9999), first_name, last_name' /* get the largest profile picture */
                        }
                    },
                    function (error, response, body) {
                        body = JSON.parse(body);
                        if (!error && response.statusCode == 200 && !body.error) {

                            resolve(body);
                        } else {
                            var errorObject = body.error || error;
                            reject(errorObject);
                        }
                    }
                );
            });
        }

    }
};