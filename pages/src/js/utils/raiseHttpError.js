export const raiseHttpError = async (url, response, notFoundMessage) => {
  if (response.status < 400) {
    return;
  }

  const headers = [...response.headers.entries()]
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  const body = await response.text();

  if (response.status < 500) {
    throw new Error(
      [
        notFoundMessage,
        `GET ${url}`,
        `${response.status} ${response.statusText}`,
        headers,
        body
      ].join('\n\n')
    );
  }

  throw new Error(
    [
      'Server error',
      `GET ${url}`,
      `${response.status} ${response.statusText}`,
      headers,
      body
    ].join('\n\n')
  );
};
