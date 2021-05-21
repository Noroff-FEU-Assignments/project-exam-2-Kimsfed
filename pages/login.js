import Head from "../components/layout/head";
import Heading from "../components/layout/heading";

import { useState } from "react";
import { setCookie } from "nookies";
import { API_URL } from "../components/api/url";
import Router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  async function handleLogin() {
    const loginData = {
      identifier: email,
      password: password,
    };

    const login = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const loginResponse = await login.json();

    if (loginResponse.error === "Bad Request") {
      setSentMessage("Email or Password is wrong");
      return <>{Router.push("/login")}</>;
    }

    setCookie(null, "jwt", loginResponse.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    Router.push("/admin");
  }
  return (
    <>
      <Head title="Login" />
      <Heading title="Holidaze" />
      <div className="border-top"></div>
      <div className="login_container">
        <form>
          <input
            type="email"
            placeholder="Email"
            onChange={(emailData) => setEmail(emailData.target.value)}
            value={email}
          />
          <br />
          <input
            type="password"
            placeholder="Password..."
            onChange={(passwordData) => setPassword(passwordData.target.value)}
            value={password}
          />
          <br />
          <button type="button" onClick={() => handleLogin()}>
            login
          </button>
        </form>
        <div className="message_confirmation">
          <p>{sentMessage}</p>
        </div>
      </div>
    </>
  );
}
