"use strict";

/**
 * story controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::story.story", ({ strapi }) => ({
  async create(ctx) {
    ctx.request.body.data.author = ctx.state.user;
    let story = await super.create(ctx);
    return story;
  },
}));
