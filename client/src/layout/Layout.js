import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import AppRoutes from "./AppRoutes";
import { SEO } from "../helpers/SEO";

const Layout = () => {
  const location = useLocation();

  const { pathname } = location;

  let titleData = {};

  if (pathname === "/") {
    titleData = {
      title: "Blog Client - Home",
      metaDescription: "The number one blog for tech content and tutorials",
    };
  } else if (pathname === "/blogs") {
    titleData = {
      title: "Blog Client - Blogs",
      metaDescription: "The number one blog for tech content and tutorials",
    };
  } else if (pathname === "/about") {
    titleData = {
      title: "Blog Client - About",
      metaDescription: "The number one blog for tech content and tutorials",
    };
  } else if (pathname === "/get-started/login") {
    titleData = {
      title: "Blog Client - Login",
      metaDescription: "The number one blog for tech content and tutorials",
    };
  } else {
    titleData = {
      title: "Blog Client - Page Not Found",
      metaDescription: "The number one blog for tech content and tutorials",
    };
  }

  SEO(titleData);
  return (
    <>
      <header className="fixed-top">
        <NavigationBar />
      </header>
      <main style={{ marginTop: "100px" }}>
        <AppRoutes />
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
