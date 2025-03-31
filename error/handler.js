const handler = (err, req, res, next) => {
  try {
    let { status, error } = JSON.parse(err.message);
    if (typeof status !== "number") {
      throw err;
    }
    console.error(status, error);
    res.status = status;
    res.json(error);
  } catch {
    console.error(err);
    if (res.status === 200) {
      res.status = 500;
    }
    res.text(err);
  }
};
export default handler;
