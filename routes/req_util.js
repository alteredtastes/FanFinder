const request = (name, params, queries, token, method) => {
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = { method, headers };
  const qs = Object.keys(queries).map((key) => {
    return `${key}=${queries[key]}`
  }).join('&');

  const uri = {
    artistImages: `https://api.napster.com/v2.1/artists/${params.id}/images`,
    releaseImages: `https://api.napster.com/v2.1/albums/${params.id}/images`,
    releaseMetadata: `https://api.napster.com/v2.1/albums/${params.id}`,
    search: `https://api.napster.com/v2.1/search`
  };

  return new Request(`${uri[name]}?${qs}`, options);
};

module.exports = request;
