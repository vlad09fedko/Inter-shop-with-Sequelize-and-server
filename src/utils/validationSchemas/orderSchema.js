import Yup from 'yup';

export const ORDER_SCHEMA = Yup.object().shape({
  code: Yup.string().min(1),
  date: Yup.date().max(now()),
  customer_id: Yup.number().min(1),
  amount: Yup.number().min(1),
  paid: Yup.bool(),
});
