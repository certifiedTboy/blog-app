import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import { useCreateNewUserMutation } from "../../lib/APIs/userApis";
import ErrorOutput from "../common/ErrorOutput";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [createNewUser, { isLoading, error, isError, isSuccess }] =
    useCreateNewUserMutation();

  const [validateInput, formError, formIsValid] = useFormValidation();

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      validateInput({ firstName, lastName, email, password, confirmPassword });
    }, 500);

    return () => clearTimeout(timer);
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    await createNewUser({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // naigate to verification page
      navigate("/get-started/verify-account");
    }
  }, [isSuccess]);

  return (
    <div>
      <h3 className="mb-5">Sign up here</h3>

      {formError && <ErrorOutput errorMessage={formError} />}
      {isError && (
        <ErrorOutput
          errorMessage={
            error?.error || error?.data?.error || "something went wrong"
          }
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter firstname"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter lastname"
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>

        <div className="form-group mb-3 mt-4">
          <button
            className={`btn form-control btn-secondary ${
              !formIsValid && "disabled"
            }`}
            type="submit"
          >
            {isLoading ? "Please wait..." : "Sign up"}
          </button>
        </div>
      </form>

      <div className="mb-5">
        <p>
          Already have an account ?{" "}
          <Link to="/get-started/login"> Sign in </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
