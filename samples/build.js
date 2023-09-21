const path = require('path');
const { fs, zip } = require('node-build-tools');

const BUILD_DIR = path.join(__dirname, 'build');
const MSTR_WEB_GENERAL_PLUGIN = path.join(
  __dirname,
  'dist',
  'MSTRWeb-plugin.zip'
);

const MSTR_WEB_SEAMLESS_LOGIN_PLUGIN = path.join(
  __dirname,
  'dist',
  'MSTRWeb-plugin-seamless-login.zip'
);

const MSTR_WEB_ENABLE_ON_CERTAIN_DOSSIER = path.join(
  __dirname,
  'dist',
  'MSTRWeb-plugin-enable-on-certain-dossier.zip'
);

const buildMSTRWebPluginZip = (outputZipFile, sourceJavaScriptFile) => {
  console.group('Building MSTRWeb plugin...');

  fs.removeSync(outputZipFile);
  const wd = path.join(BUILD_DIR, `MSTRWeb-Plugin-${Date.now()}`);
  const jsDir = path.join(wd, 'Hyper-SDK', 'javascript');
  fs.ensureDirSync(jsDir);
  fs.copySync(sourceJavaScriptFile, path.join(jsDir, 'global.js'));
  zip(wd, outputZipFile);

  console.log(outputZipFile);
  console.groupEnd();
};

const build = () => {
  console.group('Building MSTRWeb Plugins...');
  fs.removeSync(BUILD_DIR);

  buildMSTRWebPluginZip(
    MSTR_WEB_GENERAL_PLUGIN,
    path.join(__dirname, 'src', 'MSTRWeb', 'general', 'global.js')
  );

  buildMSTRWebPluginZip(
    MSTR_WEB_SEAMLESS_LOGIN_PLUGIN,
    path.join(__dirname, 'src', 'MSTRWeb', 'seamless-login', 'global.js')
  );

  buildMSTRWebPluginZip(
    MSTR_WEB_ENABLE_ON_CERTAIN_DOSSIER,
    path.join(__dirname, 'src', 'MSTRWeb', 'enable-on-certain-dossier', 'global.js')
  );

  fs.removeSync(BUILD_DIR);
  console.groupEnd();
  console.log('Done.');
};

build();
