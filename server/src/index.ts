import transactionRoutes from "./routes/transaction.routes.js";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de Pecunia! 🪙");
});

app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});