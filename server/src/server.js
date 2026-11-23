import app from "./app/app.js";
import config from "./config/config.js";
import connectDB from "./config/db.js";
app.listen(config.PORT, async () => {
  await connectDB();
  console.log(`Server has started on port ${config.PORT}...`);
});
