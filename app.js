import Dashborad from "./pages/Dashboard.js";
import Products from "./pages/Products.js";
import Posts from "./pages/Posts.js";
import NotFound from "./pages/NotFound.js";
// 1. what view show to user based on Route ?
function router() {
  // dashboard,products,posts
  const routes = [
    { path: "/", view: Dashborad },
    { path: "/products", view: Products },
    { path: "/posts", view: Posts },
  ];
  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });
  let match = potentialRoutes.find((route) => route.isMatch);
  if (!match) {
    match = {
      route: { path: "/not-found", view: NotFound },
      isMatch: true,
    };
  }
  console.log(match);
  document.querySelector("#app").innerHTML = match.route.view();
}
// push user to new url :
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
