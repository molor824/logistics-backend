export function statusMessage(status: number, error: any) {
  return { status, error };
}
export function notFoundURL(url: string) {
  return statusMessage(404, { type: "URL_NOT_FOUND", url });
}
export function invalidField(field: string) {
  return statusMessage(400, { type: "INVALID_FIELD", field });
}
export function missingField(field: string) {
  return statusMessage(404, { type: "MISSING_FIELD", field });
}
export function passwordInvalid(email: string) {
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
export function userNotFinance() {
  return statusMessage(403, { type: "USER_NOT_FINANCE" });
}
export function userNotFound() {
  return statusMessage(404, { type: "USER_NOT_FOUND" });
}
export function validationError(errors: any) {
  return statusMessage(400, { type: "VALIDATION_ERROR", errors });
}
export function accountNotFound(id: string) {
  return statusMessage(404, { type: "ACCOUNT_NOT_FOUND", id });
}
export function transactionNotFound(id: string) {
  return statusMessage(404, { type: "TRANSACTION_NOT_FOUND", id });
}
