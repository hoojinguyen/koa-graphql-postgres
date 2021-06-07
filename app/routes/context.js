const { hasPermission } = require("../lib/permissions");

const protectedRoute = async (permission, fn, ctx) => {
  let ok = await hasPermission(ctx.state.user, permission, ctx.params);
  if (!ok) {
    ctx.throw(401, `Unauthorized, need '${permission}' permission`);
    return null;
  }
  return await fn(ctx);
};

module.exports = { protectedRoute };
