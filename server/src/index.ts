import transactionRoutes from "./routes/transaction.routes.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigin = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de Pecunia! 🪙");
});

app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});