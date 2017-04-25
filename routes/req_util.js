const request = (name, params, queries, token, method) => {
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = { method, headers };
  const qs = Object.keys(queries).map((key) => {
    return `${key}=${queries[key]}`
  }).join('&');

  const uri = {
    albumImages: `https://api.napster.com/v2.1/albums/${params.id}/images`,
    artistImages: `https://api.napster.com/v2.1/artists/${params.id}/images`,
    search: `https://api.napster.com/v2.1/search`
    // getAlbumsByArtist: `https://api.napster.com/v2.1/artists/${params.id}/albums/top`
  }

  return new Request(`${uri[name]}?${qs}`, options);
}

module.exports = request;
