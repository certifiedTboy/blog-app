import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorOutput from "../common/ErrorOutput";
import { useLoginUserMutation } from "../../lib/APIs/authApis";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isSuccess, isError, isLoading, error, data }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const loginUserHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) return;

    await loginUser({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("r_f", data?.refreshToken);
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div>
      <h3 className="mb-5">Sign in here</h3>

      {isError && error && (
        <ErrorOutput
          errorMessage={
            error?.error || error?.data?.error || "something went wrong"
          }
        />
      )}
      <form onSubmit={loginUserHandler}>
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

        <div className="form-group mb-3 mt-4">
          <button className="btn btn-secondary form-control" type="submit">
            {isLoading ? "Please wait..." : "Sign in"}
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-between">
        <p>
          Don't have an account ?{" "}
          <Link to="/get-started/sign-up"> Sign up </Link>
        </p>

        <p>
          <Link to="/get-started/reset-password"> Reset Password</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
