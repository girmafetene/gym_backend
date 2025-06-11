import "reflect-metadata";
import express from "express";
import AppDataSource from "./data-source";

const initializeServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully");

        const app = express();
        app.use(express.json());

        const PORT = process.env.PORT || 9000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        return app;
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export default initializeServer;