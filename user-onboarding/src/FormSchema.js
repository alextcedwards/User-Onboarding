import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be a minimum of 3 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),

  //Checkboxes
  termsOfService: yup.boolean().required("Please check Terms of Service"),
});

export default formSchema;
