import constants from './constants';

const { SEP } = constants;

export function prefixNamespace(namespace, items = {}) {
  return Object.keys(items).reduce((acc, cur) => {
    acc[`${namespace}${SEP}${cur}`] = items[cur];
    return acc;
  }, {});
}

export const isArray = Array.isArray.bind(Array);

export const isPlainObject = require('is-plain-object'); // eslint-disable-line

