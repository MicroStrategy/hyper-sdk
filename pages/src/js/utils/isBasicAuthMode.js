export const isBasicAuthMode = (authMode) => {
  if (typeof authMode !== 'string') return false;

  const lower = authMode.toLowerCase();
  return lower.endsWith('.standard') || lower.endsWith('.ldap');
};
