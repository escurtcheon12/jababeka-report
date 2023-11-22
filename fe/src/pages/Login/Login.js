import React, { useState } from "react";
import "../../assets/css/login.css";
import "../../assets/css/bootstrap.min.css";
import logo from "../../assets/logo/jababeka_report.png";
import { onInputChange } from "../shared/utils";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { loginUser } from "../../api/apiAuth";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({ username: "", password: "" });

  const {
    status: statusLoginUser,
    error: errorLoginError,
    mutate: handleLogin,
  } = useMutation({
    mutationFn: async () =>
      await loginUser(formLogin.username, formLogin.password),
    onSuccess: (result) => {
      if (Object.values(result?.data.data).length > 0) {
        localStorage.setItem("data", JSON.stringify(result.data.data));
        navigate("/");
      }
      return queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin();
  };

  return (
    <div className="container_login">
      <div className="square_login">
        <div className="line_logo">
          <img className="img_logo_login mt-5 mb-3" src={logo} />
        </div>
        <h2 className="text_login">Login</h2>

        <div className="form_login p-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Your username"
                value={formLogin.username}
                onChange={(e) =>
                  onInputChange("username", e, formLogin, setFormLogin)
                }
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label mt-3">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Your password"
                value={formLogin.password}
                onChange={(e) =>
                  onInputChange("password", e, formLogin, setFormLogin)
                }
              />
            </div>

            <button className="btn btn-login btn-danger mt-4">Log In</button>
          </form>
        </div>

        <p className="text-danger">{errorLoginError?.response.data.message}</p>

        <p className="pb-4">
          Don’t have an account?
          <a href="/register" className="text_signUp">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
