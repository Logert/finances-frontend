export default (headers, token) => {
  if (typeof headers === 'string' && token === undefined) {
    return { 'Authorization': 'Bearer ' + headers };
  } else if (token) {
    return { ...headers, Authorization: 'Bearer ' + token };
  }
};