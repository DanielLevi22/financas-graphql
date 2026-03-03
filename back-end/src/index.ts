import "reflect-metadata";
import { env } from './env';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { CategoryResolver } from "./graphql/resolvers/CategoryResolver";
import { TransactionResolver } from "./graphql/resolvers/TransactionResolver";
import { context } from "./context";

async function bootstrap() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  const schema = await buildSchema({
    resolvers: [UserResolver, CategoryResolver, TransactionResolver],
    validate: true,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({ 
    schema,
    formatError: (formattedError, error) => {
      if (
        formattedError.message.includes('Prisma') ||
        formattedError.message.includes('Unique constraint failed') ||
        formattedError.message.includes('invocation in')
      ) {
        return {
          ...formattedError,
          message: 'Erro interno no servidor ou conflito de dados.',
        };
      }
      return formattedError;
    },
  });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: context,
    }),
  );

  const PORT = env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}/graphql`);
  });
}

bootstrap();
