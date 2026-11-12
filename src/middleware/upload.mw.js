import path from 'path';

import multer from 'multer';

import staticPath from '../config/staticConfig.js';

const storageBrandLogo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(staticPath, 'images', 'brands'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const filterBrandLogo = (req, file, cb) => {
  return /^image\/(png|jpg|jpeg)/.test(file.mimetype)
    ? cb(null, true)
    : cb(null, false);
};

export const uploadBrandLogo = multer({
  storage: storageBrandLogo,
  fileFilter: filterBrandLogo,
});
