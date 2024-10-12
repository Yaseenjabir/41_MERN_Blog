const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./routes/postsRoute");
const usersRouter = require("./routes/usersRoute");
const likesRouter = require("./routes/likesRoute");
const commentsRouter = require("./routes/commentsRoute");
const viewRouter = require("./routes/ViewRoute");
const searchRouter = require("./routes/searchRoute");
const verifyToken = require("./Middlewares/verifyToken");
app.use(cors());

app.use(express.json());
app.use("/post", postsRouter);
app.use("/user", usersRouter);
app.use("/likes", verifyToken, likesRouter);
app.use("/comments", verifyToken, commentsRouter);
app.use("/view", viewRouter);
app.use("/search", searchRouter);

app.listen(8000);
