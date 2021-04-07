import { getMainBundleUrl } from './getMainBundleUrl';
import { storage } from './storage';

export const getLoadMainBundleScript = () =>
  `<script type="text/javascript" src="${getMainBundleUrl(
    storage.server()
  )}"></script>`;
