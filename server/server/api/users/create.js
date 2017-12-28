var path = require('path'),
    User = require(path.resolve('./src/models/user')),
    _ = require('lodash'),
    uuid = require('node-uuid'),
    Q = require('q');
module.exports = function () {

    return function (req) {
        var deferred = Q.defer();




        return deferred.promise;
    }

};