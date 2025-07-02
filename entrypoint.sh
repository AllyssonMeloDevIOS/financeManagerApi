#!/bin/sh

echo "📦 Rodando migrations..."
npm run migration:run

echo "🚀 Iniciando aplicação..."
npm run start:only
