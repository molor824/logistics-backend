export function statusMessage(status, error) {
  return new Error(JSON.stringify({ status, error }));
}
export function notFoundURL(url) {
  return statusMessage(404, { type: "URL_NOT_FOUND", url });
}
export function invalidField(field) {
  return statusMessage(400, { type: "INVALID_FIELD", field });
}
export function missingField(field) {
  return statusMessage(404, { type: "MISSING_FIELD", field });
}
