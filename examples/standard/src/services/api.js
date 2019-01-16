/**
 * services
 *
 * Put the apis to there so we can manage them conveniently
 *
 */

import { get } from '../core/request';

// fetch random data
export async function fetchRandomData(params) {
  return get('https://randomuser.me/api', params);
}
