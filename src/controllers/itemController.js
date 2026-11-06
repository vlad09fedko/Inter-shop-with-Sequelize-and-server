import db from '../db/models/index.cjs';
console.log(db)

class BrandController {
  async getAllBrands(req, res, next) {
    try {
      const brands = await Brand.findAll({
        raw: true,
      });
      return res.json(brands);
    } catch (error) {
      next(error);
    }
  }
  async getBrandById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async createBrand(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateBrand(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBrand(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export const itemController = new BrandController();
