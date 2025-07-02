#!/bin/sh

echo "📦 Rodando migrations..."
npx -r dotenv/config typeorm migration:run -d dist/database/data-source.js
MIGRATION_EXIT_CODE=$?

if [ $MIGRATION_EXIT_CODE -ne 0 ]; then
  echo "❌ Erro ao rodar migrations. Código de saída: $MIGRATION_EXIT_CODE"
  echo "📄 Exibindo logs de erro:"
  # Exibe as últimas linhas do log da aplicação
  tail -n 100 /app/dist/database/migrations/*.js 2>/dev/null
  exit $MIGRATION_EXIT_CODE
fi

echo "🚀 Iniciando aplicação..."
exec node dist/index.js
