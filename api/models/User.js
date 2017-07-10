/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    username: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'email',
      unique: true,
      required: true,
    },
    age: {
      type: 'integer',
    },
    verificationCode: {
      type: 'string',
    },
    verified: {
      type: 'integer'
    },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.verified;
        delete obj.verificationCode;
        delete obj.password;
        return obj;
    },
  },

  beforeCreate: function (request, response) {
    request.verified = 0;

    require('crypto').randomBytes(48, function(err, buffer) {
      request.verificationCode = buffer.toString('base64');
    });

    require('bcrypt').hash(request.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return response(err);
      request.password = encryptedPassword;
      response();
    });
  },
};

