'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::banner.banner', ({ strapi }) => ({
  async image(ctx) {
    const { theme, locale } = ctx.query;

    if (!theme || !locale) {
      return ctx.badRequest('theme and locale query parameters are required');
    }

    const entries = await strapi.entityService.findMany('api::banner.banner', {
      filters: { theme },
      locale,
      populate: { image: true },
      limit: 1,
      publicationState: 'live',
    });

    const entry = entries?.[0];
    if (!entry?.image?.url) {
      return ctx.notFound('Banner not found');
    }

    ctx.redirect(entry.image.url);
  },
}));
