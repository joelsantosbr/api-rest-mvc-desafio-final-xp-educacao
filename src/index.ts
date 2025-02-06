import Fastify from "fastify";
import productRoutes from "./routes/ProductRoutes";
import { setupSwagger } from "./config/swagger";

const fastify = Fastify({ logger: true });

setupSwagger(fastify);

fastify.register(productRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 5050 });
    console.log("🚀 Server running on http://localhost:5050");
    console.log("📄 Swagger Docs available at http://localhost:5050/docs");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
