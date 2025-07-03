#!/bin/sh

echo "📦 Rodando migrations..."
npx -r dotenv/config typeorm migration:run -d dist/database/data-source.js
MIGRATION_EXIT_CODE=$?

if [ "$MIGRATION_EXIT_CODE" -ne 0 ]; then
  echo "⚠️ Aviso: Migration retornou código $MIGRATION_EXIT_CODE. Verifique se há erro real."
  echo "📄 Exibindo logs de migração:"
  tail -n 100 /app/dist/database/migrations/*.js 2>/dev/null
  # Se quiser forçar o erro, use: exit "$MIGRATION_EXIT_CODE"
fi

echo "🚀 Iniciando aplicação..."
exec node dist/index.js