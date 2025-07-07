#!/bin/sh

echo "📦 Esperando banco ficar pronto..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "⏳ Aguardando PostgreSQL em $DB_HOST:$DB_PORT..."
  sleep 2
done

echo "📦 Buildando aplicação e rodando migrations..."
npm run build
npx typeorm migration:run -d dist/database/data-source.js

echo "🚀 Iniciando aplicação..."
npm run start:only
