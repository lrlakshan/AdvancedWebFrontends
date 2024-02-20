import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Cart from "./components/Cart.vue";
import Login from "./components/Login.vue";
import NotFound from "./components/NotFound.vue";
import Register from "./components/Register.vue";
import User from "./components/User.vue";
import UserModifier from "./components/UserModifier.vue";
import Users from "./components/Users.vue";
import Auth from "./components/Auth.vue";
import Order from "./components/Order.vue";
import Orders from "./components/Orders.vue";
import Products from "./components/Products.vue";
import Product from "./components/Product.vue";
import ProductModifier from "./components/ProductModifier.vue";
import Finder from "./components/Finder.vue";

// Assuming getProduct, getOrder, getUser are imported correctly

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/products",
    component: Products,
  },

  {
    path: "/products/:productId",
    component: Finder,
    props: { type: "product" },
    children: [
      {
        path: "",
        component: Product,
      },
      {
        path: "modify",
        component: Auth,
        props: { authRoles: ["admin"] },
        children: [
          {
            path: "",
            component: ProductModifier,
          },
        ],
      },
    ],
  },
  {
    path: "/cart",
    component: Auth,
    props: { authRoles: ["guest", "customer"] },
    children: [
      {
        path: "",
        component: Cart,
      },
    ],
  },
  {
    path: "/orders",
    component: Auth,
    props: { authRoles: ["admin", "customer"] },
    children: [
      {
        path: "",
        component: Orders,
      },
      {
        path: ":orderId",
        component: Finder,
        props: { type: "order" },
        children: [
          {
            path: "",
            component: Order,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    component: Auth,
    props: { authRoles: ["guest"] },
    children: [
      {
        path: "",
        component: Register,
      },
    ],
  },
  {
    path: "/login",
    component: Auth,
    props: { authRoles: ["guest"] },
    children: [
      {
        path: "",
        component: Login,
      },
    ],
  },
  {
    path: "/users",
    component: Auth,
    props: { authRoles: ["admin"] },
    children: [
      {
        path: "",
        component: Users,
      },
      {
        path: ":userId",
        component: Finder,
        props: { type: "user" },
        children: [
          {
            path: "",
            component: User,
          },
          {
            path: "modify",
            component: UserModifier,
          },
        ],
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export let previousRoute = null;

router.beforeEach((to, from, next) => {
  previousRoute = from;
  next();
});

export default router;
