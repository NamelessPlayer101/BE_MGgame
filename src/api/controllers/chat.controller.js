module.exports = {
  message: async(req, res, next) => {
    const { msg } = req.query;
    _io.emit("chat", msg);
    res.json({
      code: 200,
      message: msg,
    });
  },
};
