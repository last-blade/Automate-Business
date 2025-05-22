import { app } from "./app.js";
import { connectDB } from "./database/database.js";

connectDB()
.then(() => {
    const PORT = process.env.PORT || 8000;
        const host = process.env.NODE_ENV === "production"
      ? `https://automatebusinessbackend.onrender.com`
      : `http://localhost:${PORT}`;

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
    console.log("Database connected !!")
})
.catch((error) => {
    console.log("Error in connection to database", error.message);
})
.finally(() => {
    console.log("Database connection attempt finished.");
})