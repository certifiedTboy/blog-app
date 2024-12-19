import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutput from "../common/ErrorOutput";
import { useVerifyUserMutation } from "../../lib/APIs/userApis";

const Verification = () => {
  const verificationTokenRef = useRef();

  const navigate = useNavigate();

  const [verifyUser, { isSuccess, isError, error, isLoading }] =
    useVerifyUserMutation();

  const onVerifyUser = async (event) => {
    event.preventDefault();

    const verificationToken = verificationTokenRef?.current?.value;

    await verifyUser({ verificationToken });
  };

  useEffect(() => {
    if (isSuccess) {
      // navigate to login page
      navigate("/get-started/login");
    }
  }, [isSuccess]);

  return (
    <div>
      <h3 className="mb-5">Verify Account</h3>

      {isError && error && (
        <ErrorOutput
          errorMessage={
            error?.error || error?.data?.error || "Something went wrong"
          }
        />
      )}
      <form onSubmit={onVerifyUser}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter verification code"
            ref={verificationTokenRef}
          />
        </div>

        <div className="form-group mb-3 mt-4">
          <button className="btn btn-secondary form-control" type="submit">
            {isLoading ? "Please wait..." : "Verify"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verification;
