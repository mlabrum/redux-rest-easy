import jsonStableStringify from 'json-stable-stringify';
import { v3 as murmurHash3 } from 'murmur-hash';

var hash = function hash(data) {
  return murmurHash3.x64.hash128(jsonStableStringify(data || null));
};

export default hash;