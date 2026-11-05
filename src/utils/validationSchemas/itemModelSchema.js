import Yup from 'yup';

export const ITEM_MODEL_SCHEMA = Yup.object().shape({
  title: Yup.string().min(3).max(100).required(),
  description: Yup.string().max(100),
  brand_id: Yup.number().min(1),
});
