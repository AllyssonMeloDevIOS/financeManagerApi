// fixMigrations.js
const fs = require('fs');
const path = require('path');

// 1. Corrige data-source.js
const dsPath = path.join(__dirname, 'dist', 'database', 'data-source.js');
fs.readFile(dsPath, 'utf8', (err, data) => {
  if (err) return console.error('❌ Erro lendo data-source.js:', err);

  const fixed = data.replace(
    /exports\.AppDataSource\s*=\s*new .*DataSource\(dbConfig\);/,
    `
const AppDataSource = new typeorm_1.DataSource(dbConfig);
module.exports = { AppDataSource };
    `.trim()
  );

  fs.writeFile(dsPath, fixed, 'utf8', err => {
    if (err) return console.error('❌ Erro salvando data-source.js:', err);
    console.log('✅ data-source.js corrigido com sucesso.');
  });
});

// 2. Corrige todas as migrations geradas
const migrationsDir = path.join(__dirname, 'dist', 'database', 'migrations');
fs.readdir(migrationsDir, (err, files) => {
  if (err) return console.error('❌ Erro lendo migrations:', err);

  files
    .filter(f => f.endsWith('.js'))
    .forEach(file => {
      const filePath = path.join(migrationsDir, file);
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) return console.error(`❌ Erro lendo ${file}:`, err);

        const fixed = content.replace(
          /exports\.default\s*=\s*(\w+);/,
          'module.exports = $1;'
        );

        fs.writeFile(filePath, fixed, 'utf8', err => {
          if (err) return console.error(`❌ Erro salvando ${file}:`, err);
          console.log(`✅ ${file} corrigido com sucesso.`);
        });
      });
    });
});
