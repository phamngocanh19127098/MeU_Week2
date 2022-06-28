import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import authRoute from "../routes/auth.route.js";
import userRoute from "../routes/users.route.js";
import productRoute from "../routes/product.route.js";
import orderRoute from "../routes/order.route.js";

export default function (app) {
  app.use("/api/admin", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/product", productRoute);
  app.use("/api/order",orderRoute);
}
