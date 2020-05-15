'use strict'
const { skip } = require('graphql-resolvers');

const asyncWrapper = fn => (request, response, next) => Promise.resolve(fn(request, response, next)).catch(next)

module.exports =  { asyncWrapper }