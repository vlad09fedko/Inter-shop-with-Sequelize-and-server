import Yup from 'yup';

export const ITEM_SCHEMA = Yup.object().shape({
  categ_id: Yup.number().min(1),
  type_id: Yup.number().min(1),
  brand_id: Yup.number().min(1),
  model_id: Yup.number().min(1),
  price: Yup.number().min(1),
  store_id: Yup.number().min(1),
  amount: Yup.number().min(0),
});
