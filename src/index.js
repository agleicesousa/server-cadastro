const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});