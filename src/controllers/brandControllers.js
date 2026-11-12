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
      const deletedBrandsCount = await db.Brand.destroy({
        where: { id: req.params.brandId },
      });
      if (deletedBrandsCount) {
        return res.json(deletedBrandsCount);
      } else {
        throw createError(404, 'Brand not found!');
      }
    } catch (error) {
      next(error);
    }
  }

  async updateLogo(req, res, next) {
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
        },
      );
      if(count){
        return res.json(updatedBrands)
      }
      next(createError(404, 'Brand not found'))
    } catch (error) {
      next(error);
    }
  }
}

export const brandController = new BrandController();
