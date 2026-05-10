import "dotenv/config";
import app from "./app.js";
import path from 'path'; // 
import apiRoutes from './apiRoutes';

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(publicPath, 'index.html'));
  } catch (error) {
    res.status(500).send("Erro ao carregar o index.html");
  }
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
}

export default app;
