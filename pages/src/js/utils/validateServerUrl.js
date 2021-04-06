import { buildUrl } from './buildUrl';
import { storage } from './storage';
import { raiseHttpError } from './raiseHttpError';
import { getMainBundleUrl } from './getMainBundleUrl';

export const validateServerUrl = async (url) => {
  const isTrusted = storage.authMode().endsWith('TRUSTED');
  const options = isTrusted
    ? {
        mode: 'cors',
        credentials: 'include'
      }
    : { mode: 'no-cors' };
  const isValidServer = await fetch(buildUrl(url, '/api/status'), options);
  await raiseHttpError(url, isValidServer, 'Server is not reachable.');

  const sdk = getMainBundleUrl(url);
  const hasHyperSDK = await fetch(sdk, options);
  await raiseHttpError(
    sdk,
    hasHyperSDK,
    'Hyper SDK resources were not found on server.'
  );
};
