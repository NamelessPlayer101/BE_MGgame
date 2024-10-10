module.exports = {
  message: async (req, res, next) => {
    const body = req.body;
    _io.emit(
      "chat",
      JSON.stringify({
        message: body.message,
      })
    );
    res.json({
      code: 200,
      message: body.message,
    });
  },
};
