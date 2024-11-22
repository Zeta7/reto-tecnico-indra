import app from './infrastructure/server/config';

import serverless from 'serverless-http';

module.exports.handler = serverless(app);
