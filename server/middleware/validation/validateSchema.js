export const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation Failed!",
        errors:
          result.error && result.error.errors
            ? result.error.errors
            : result.error.format(),
      });
    }

    req.validatedData = result.data;
    next();
  };
};
