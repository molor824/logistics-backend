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
export function emailNotFound(email) {
  return statusMessage(404, { type: "EMAIL_NOT_FOUND", email });
}
export function passwordInvalid(email) {
  return statusMessage(401, { type: "INVALID_PASSWORD", email });
}
export function missingToken() {
  return statusMessage(401, { type: "MISSING_TOKEN" });
}
export function invalidToken() {
  return statusMessage(401, { type: "INVALID_TOKEN" });
}
export function userNotAdmin() {
  return statusMessage(403, { type: "USER_NOT_ADMIN" });
}
export function userNotFound() {
  return statusMessage(404, { type: "USER_NOT_FOUND" });
}
