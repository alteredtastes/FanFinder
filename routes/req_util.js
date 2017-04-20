const request = (name, params, queries, token, method) => {
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = { method, headers };
  const qs = Object.keys(queries).map((key) => {
    return `${key}=${queries[key]}`
  }).join('&');

  const uri = {
    search: `https://api.napster.com/v2.1/search`,
    artistImages: `https://api.napster.com/v2.1/artists/${params.id}/images`
  }

  return new Request(`${uri[name]}?${qs}`, options);
}

module.exports = request;
