export const validate = (schema) => async (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log(result);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation error",
      details: result.error.errors.map((e) => e.message),
    });
  }

  req.body = result.data;
  next();
};
