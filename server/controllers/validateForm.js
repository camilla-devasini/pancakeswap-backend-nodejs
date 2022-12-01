const yup = require("yup");

const formSchema = yup.object({
  username: yup
    .string()
    .required("The Username is required")
    .min(6, "The Username is too short")
    .max(28, "The Username is too long"),
  password: yup
    .string()
    .required("The Password is required")
    .min(6, "The Password is too short")
    .max(28, "The Password is too long!"),
});

//middleware
const validateForm = (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send(); //per inviare una risposta anche quando si fa submit con i campi vuoti
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log("form is good");
      }
    });
};

module.exports = validateForm;
