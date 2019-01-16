module.exports = {
    urlPrefix: process.env['URL_PREFIX'] || '',
    servicePort: process.env['PORT'] || '8001',
    sessionCookieName: process.env['SESSION_COOKIE_NAME'] || 'express-session',
    sessionSecretEnvName: 'SESSION_SECRET',
    starsUrl: 'ldap://mquery.mastars.nao.ac.jp',
    mongoUrl: process.env['MONGO_URL'] || 'mongodb://localhost/obslog',
}