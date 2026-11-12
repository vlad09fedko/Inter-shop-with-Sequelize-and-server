import createError from 'http-errors';

import db from '../db/models/index.js';

class BrandController {
  async getAllBrands(req, res, next) {
    try {
      console.log(req.query);
      const brands = await db.Brand.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!brands.length) throw createError(404, 'Brands not found!');
      return res.json(brands);
    } catch (error) {
      next(error);
    }
  }

  async getBrandById(req, res, next) {
    try {
      const brand = await db.Brand.findByPk(req.params.brandId);
      if (!brand) throw createError(404, 'Brand not found!');
      return res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  async createBrand(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const createdBrand = await db.Brand.create(req.body, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdBrand);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateBrand(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const updatedBrand = await db.Brand.update(req.body, {
        where: { id: req.params.brandId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedBrand[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async deleteBrand(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const deletedBrandsCount = await db.Brand.destroy({
        where: { id: req.params.brandId },
        transaction: t,
      });
      if (deletedBrandsCount) {
        await t.commit();
        return res.json(deletedBrandsCount);
      }
      throw createError(404, 'Brand not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateLogo(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const {
        params: { brandId },
        file: { filename },
      } = req;
      const [count, [updatedBrands]] = await db.Brand.update(
        { logo: filename },
        {
          raw: true,
          where: { id: brandId },
          fields: ['logo'],
          returning: ['id', 'title'],
          transaction: t,
        },
      );
      if (count) {
        await t.commit();
        return res.json(updatedBrands);
      }
      throw createError(404, 'Brand not found');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const brandController = new BrandController();
