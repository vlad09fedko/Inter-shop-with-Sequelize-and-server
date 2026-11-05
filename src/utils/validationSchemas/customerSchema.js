import Yup from 'yup'

export const CUSTOMER_SCHEMA = Yup.object().shape({
  full_name: Yup.string().min(3).max(100).required(),
  email: Yup.string().email().required(),
})