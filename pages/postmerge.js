const ps = require('child_process');
const path = require('path');

const sh = (cmd) =>
  ps.execSync(cmd, {
    cwd: __dirname,
    stdio: 'inherit',
    windowsHide: true,
  });

[
  'yarn install',
  'yarn build',
  'git config user.name "Jenkins Bot"',
  'git config user.email "yali@microstrategy.com"',
  'git add ../code-examples',
  'git commit -m "[jenkins][bot]: re-generate code-examples"',
  'git push origin master',
].forEach(sh);
