import { API_URL } from "../components/api/url";
import "../styles/style.scss";

import Router from "next/router";
import { parseCookies } from "nookies";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const jwt = parseCookies(ctx).jwt;

  const res = await fetch(`${API_URL}/hotels`);
  const navigation = await res.json();

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!jwt) {
    if (ctx.pathname === "/admin") {
      redirectUser(ctx, "/login");
    }
  }

  return {
    pageProps,
    navigation,
  };
};

export default MyApp;
