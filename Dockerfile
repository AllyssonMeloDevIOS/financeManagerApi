# Usa a imagem oficial do Node.js como base (versão LTS Alpine é leve)
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# ✅ Instala git para evitar erro de ENOENT com dependências ocultas
RUN apk add --no-cache git

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante do código fonte para o diretório de trabalho
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Copia e dá permissão ao script de entrada
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expõe a porta da API
EXPOSE 3000

# Usa o script de entrada
CMD ["./entrypoint.sh"]