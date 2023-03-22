const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  const token = ctx.request.header.authorization;
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch({ id });
      ctx.state.user = user;
    } catch (err) {
      console.log(err);
      ctx.throw(401, "Invalid token");
    }
  }
  await next();
};
