'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchGoogleProfile = exports.fetchAccessTokens = exports.googleSignIn = undefined;

var googleSignIn = exports.googleSignIn = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
    var code, tokens, _ref2, id, email, name, providerUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return signInWithPopup();

          case 2:
            code = _context.sent;
            _context.next = 5;
            return fetchAccessTokens(code);

          case 5:
            tokens = _context.sent;
            _context.next = 8;
            return fetchGoogleProfile(tokens.access_token);

          case 8:
            _ref2 = _context.sent;
            id = _ref2.id;
            email = _ref2.email;
            name = _ref2.name;
            providerUser = {
              uid: id,
              email: email,
              displayName: name,
              idToken: tokens.id_token
            };
            return _context.abrupt('return', callback(providerUser));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function googleSignIn(_x) {
    return _ref.apply(this, arguments);
  };
}();

var fetchAccessTokens = exports.fetchAccessTokens = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(code) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _axios2.default.post(GOOGLE_TOKEN_URL, _qs2.default.stringify({
              code: code,
              client_id: GOOGLE_CLIENT_ID,
              redirect_uri: GOOGLE_REDIRECT_URI,
              grant_type: 'authorization_code'
            }), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            });

          case 2:
            response = _context2.sent;
            return _context2.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function fetchAccessTokens(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var fetchGoogleProfile = exports.fetchGoogleProfile = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(accessToken) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _axios2.default.get(GOOGLE_PROFILE_URL, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
              }
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function fetchGoogleProfile(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.signInWithPopup = signInWithPopup;

var _url = require('url');

var _electron = require('electron');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
var GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
var GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me';
var GOOGLE_CLIENT_ID = _config2.default.clientId;

function signInWithPopup() {
  return new Promise(function (resolve, reject) {
    var authWindow = new _electron.remote.BrowserWindow({
      width: 500,
      height: 600,
      show: true
    });

    // TODO: Generate and validate PKCE code_challenge value
    var urlParams = {
      response_type: 'code',
      redirect_uri: GOOGLE_REDIRECT_URI,
      client_id: GOOGLE_CLIENT_ID,
      scope: 'profile email'
    };
    var authUrl = GOOGLE_AUTHORIZATION_URL + '?' + _qs2.default.stringify(urlParams);

    function handleNavigation(url) {
      var query = (0, _url.parse)(url, true).query;
      if (query) {
        if (query.error) {
          reject(new Error('There was an error: ' + query.error));
        } else if (query.code) {
          // Login is complete
          authWindow.removeAllListeners('closed');
          setImmediate(function () {
            return authWindow.close();
          });

          // This is the authorization code we need to request tokens
          resolve(query.code);
        }
      }
    }

    authWindow.on('closed', function () {
      // TODO: Handle this smoothly
      throw new Error('Auth window was closed by user');
    });

    authWindow.webContents.on('will-navigate', function (event, url) {
      handleNavigation(url);
    });

    authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
      handleNavigation(newUrl);
    });

    authWindow.loadURL(authUrl);
  });
}
