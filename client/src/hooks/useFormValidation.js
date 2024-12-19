import { useState } from "react";

const useFormValidation = () => {
  const [formError, setFormError] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const validateInput = (inputData) => {
    if (!inputData?.firstName || !inputData?.lastName || !inputData?.email) {
      setFormError("All input fields are required");
      return setFormIsValid(false);
    }

    // enter more validation rule for your input data

    setFormError("");
    return setFormIsValid(true);
  };

  return [validateInput, formError, formIsValid];
};

export default useFormValidation;
