import Yup from 'yup';

export const ITEM_CATEGORY_SCHEMA = Yup.object().shape({
  title: Yup.string().min(3).max(100).required(),
  description: Yup.string().max(100),
});
