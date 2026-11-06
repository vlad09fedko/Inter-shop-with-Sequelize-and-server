import * as SCHEMAS from '../utils/validationSchemas/index.js';

export const validateBrand = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.BRAND_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateCustomer = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.CUSTOMER_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateItemCategory = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.ITEM_CATEGORY_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateItemModel = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.ITEM_MODEL_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateItem = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.ITEM_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateItemType = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.ITEM_TYPE_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateOrder = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.ORDER_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateStore = async (req, res, next) => {
  try {
    const validatedBody = await SCHEMAS.STORE_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(error);
  }
};
