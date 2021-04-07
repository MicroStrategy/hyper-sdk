export const buildUrl = (base, path) => {
  if (typeof base !== 'string') {
    return '';
  }

  const trailingSlashes = /\/+$/g;
  const left = `${base.replace(trailingSlashes, '')}/`;
  if (!path) {
    return left;
  }

  const leadingSlashes = /^\/+/g;
  const right = path.replace(leadingSlashes, '');
  if (!right) {
    return left;
  }

  return left ? `${left}${right}` : right;
};
