const initAutoLogin = (s) => {
  const autoLogin = s.autoLogin() !== 'false';
  const [yes, no] = document.auth.autoLogin;
  yes.checked = autoLogin;
  no.checked = !autoLogin;

  yes.addEventListener('change', () => {
    s.autoLogin('true');
  });

  no.addEventListener('change', () => {
    s.autoLogin('false');
  });
};

const initAuthMode = (s) => {
  const authMode = s.authMode();
  const select = document.auth.authMode;
  for (let i = 0; i < select.options.length; i += 1) {
    if (select.options[i].value === authMode) {
      select.selectedIndex = i;
      break;
    }
  }

  select.addEventListener('change', () => {
    s.authMode(select.value);
  });
};

const initCredentials = (s) => {
  const txtUsername = document.auth.username;
  txtUsername.value = s.username();
  txtUsername.addEventListener('change', () => {
    s.username(txtUsername.value || null);
  });

  const txtPassword = document.auth.password;
  txtPassword.value = s.username() ? s.password() : '';
  txtPassword.addEventListener('change', () => {
    s.password(txtPassword.value || null);
  });

  const txtAuthToken = document.auth.authToken;
  txtAuthToken.value = s.authToken();
  txtAuthToken.addEventListener('change', () => {
    s.authToken(txtAuthToken.value || null);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const s = demo.storage;
  initAutoLogin(s);
  initAuthMode(s);
  initCredentials(s);
});
