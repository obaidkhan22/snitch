import app from "./app/app.js";
import config from "./config/config.js";
app.listen(config.PORT, () => {
  console.log(`Server has started on port ${config.PORT}...`);
});
