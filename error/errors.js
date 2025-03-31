export function statusMessage(status, error) {
  return new Error(JSON.stringify({ status, error }));
}
export function notFoundURL(url) {
  return this.statusMessage(404, { type: "URL_NOT_FOUND", url });
}
