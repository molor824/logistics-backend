import v from "validator";
import { missingField, invalidField } from "../error/errors.js";

export default function validate(body, schema, bodyField = "body") {
  if (!Array.isArray(body)) {
    body = Object.fromEntries(
      Object.entries(body).filter(([key]) => key in schema)
    );
    if (typeof body !== "object" || Array.isArray(body)) {
      throw invalidField(bodyField);
    }
    for (const [key, value] of Object.entries(schema)) {
      const { required, type, enums } = value;
      const field = body[key];
      if (required && typeof field === "undefined") {
        throw missingField(key);
      }
      if (typeof field !== "undefined") {
        switch (type) {
          case "email":
            if (!v.isEmail(field)) {
              throw invalidField(key);
            }
            break;
          case "phone":
            if (!v.isMobilePhone(field, "any")) {
              throw invalidField(key);
            }
            break;
          case "string":
            if (typeof field !== "string") {
              throw invalidField(key);
            }
            break;
          case "number":
            if (typeof field !== "number") {
              throw invalidField(key);
            }
            break;
          case "enum":
            if (!enums.includes(field)) {
              throw invalidField(key);
            }
            break;
          default:
            if (typeof type === "object") {
              if (typeof field !== "object") {
                throw invalidField(key);
              }
              body[key] = validate(field, type, key);
              break;
            }
            throw new Error(`Invalid validator type ${type}`);
        }
      }
    }
    return body;
  } else {
    const inner = schema[0];
    if (typeof body !== "object" || !Array.isArray(body)) {
      throw invalidField(bodyField);
    }
    return body.map((item) => validate(item, inner));
  }
}
