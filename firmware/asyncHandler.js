/**
 *
 * @param {(req: import("express").Request, res: import("express").Response, next) => Promise<void>} fn
 * @returns
 */
export default function asyncHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
