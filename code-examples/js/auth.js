const initAuthMode = (s) => {
  const authMode = s.authMode();
  const select = document.auth.authMode;
  for (let i = 0; i < select.options.length; i += 1) {
    if (select.options[i].value === authMode) {
      select.selectedIndex = i;
      break;
    }
  }
  const setAuthMode = () => {
    s.authMode(select.value);
    const isBasicAuth = select.value.endsWith('.STANDARD');
    Array.from(document.querySelectorAll('.credential')).forEach((it) =>
      it.classList.toggle('is-hidden', !isBasicAuth),
    );
  };

  setAuthMode();
  select.addEventListener('change', setAuthMode);
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

window.addEventListener('load', () => {
  const s = demo.storage;
  initAuthMode(s);
  initCredentials(s);
});
