import React, { useState } from "react";
import "../../assets/css/register.css";
import "../../assets/css/bootstrap.min.css";
import logo from "../../assets/logo/jababeka_report.png";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { registerUser } from "../../api/apiAuth";
import { onInputChange } from "../shared/utils";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    repeat_password: "",
  });

  const {
    status: statusRegisterUser,
    error: errorRegisterUser,
    mutate: handleRegister,
  } = useMutation({
    mutationFn: async () =>
      await registerUser(
        formRegister.username,
        formRegister.email,
        formRegister.phone,
        formRegister.password,
        formRegister.repeat_password
      ),
    onSuccess: (result) => {
      if (Object.values(result?.data.data).length > 0) {
        localStorage.setItem("data", JSON.stringify(result.data.data[0]));
        navigate("/login");
      }
      return queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister();
  };

  return (
    <div className="container_register">
      <div className="square_register">
        <div className="line_logo">
          <img className="img_logo_register mt-5" src={logo} />
        </div>
        <h2 className="text_login mt-3">Register</h2>

        <div className="form_login p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div>
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Your username"
                    value={formRegister.username}
                    onChange={(e) =>
                      onInputChange(
                        "username",
                        e,
                        formRegister,
                        setFormRegister
                      )
                    }
                  />
                </div>

                <div>
                  <label htmlFor="Email" className="form-label mt-3">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    placeholder="Your email"
                    value={formRegister.email}
                    onChange={(e) =>
                      onInputChange("email", e, formRegister, setFormRegister)
                    }
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="form-label mt-3">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Your phone number"
                    value={formRegister.phone}
                    onChange={(e) =>
                      onInputChange("phone", e, formRegister, setFormRegister)
                    }
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Your password"
                    value={formRegister.password}
                    onChange={(e) =>
                      onInputChange(
                        "password",
                        e,
                        formRegister,
                        setFormRegister
                      )
                    }
                  />
                </div>

                <div>
                  <label htmlFor="repeat_password" className="form-label mt-3">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="repeat_password"
                    placeholder="Confirm your password"
                    value={formRegister.repeat_password}
                    onChange={(e) =>
                      onInputChange(
                        "repeat_password",
                        e,
                        formRegister,
                        setFormRegister
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-login btn-danger mt-4">Sign Up</button>
          </form>
        </div>

        <p className="text-danger">
          {errorRegisterUser?.response.data.message}
        </p>

        <p className="pb-1">
          You have account?
          <a href="/login" className="text_signUp">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
