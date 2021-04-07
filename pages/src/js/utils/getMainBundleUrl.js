import {
  DEMO_BASE_URL,
  JS_BUNDLE_RELATIVE_PATH,
  JS_BUNDLE_RELATIVE_PATH_DEMO
} from './constants';
import { buildUrl } from './buildUrl';

export const getMainBundleUrl = (server) => {
  if (server.toLowerCase().startsWith(DEMO_BASE_URL)) {
    return `${DEMO_BASE_URL}/${JS_BUNDLE_RELATIVE_PATH_DEMO}`;
  }

  return buildUrl(server, JS_BUNDLE_RELATIVE_PATH);
};
