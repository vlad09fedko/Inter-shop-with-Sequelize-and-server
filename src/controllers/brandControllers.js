import createError from 'http-errors';

import db from '../db/models/index.js';

class BrandController {
  async getAllBrands(req, res, next) {
    try {
      const brands = await db.Brand.findAll({ raw: true });
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
    try {
      const createdBrand = await db.Brand.create(req.body, { raw: true });
      return res.json(createdBrand);
    } catch (error) {
      next(error);
    }
  }

  async updateBrand(req, res, next) {
    try {
      const updatedBrand = await db.Brand.update(req.body, {
        where: { id: req.params.brandId },
        returning: true,
      });
      return res.json(...updatedBrand[1]);
    } catch (error) {
      next(error);
    }
  }

  async deleteBrand(req, res, next) {
    try {
      const deletedBrandId = await db.Brand.destroy({
        where: { id: req.params.brandId },
      });
      if (deletedBrandId) {
        return res.json(deletedBrandId);
      } else {
        throw createError(404, 'Brand not found!');
      }
    } catch (error) {
      next(error);
    }
  }
}

export const brandController = new BrandController();
