# Dockerfile (na raiz do seu projeto)

# Usa a imagem oficial do Node.js como base (versão LTS Alpine é leve)
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante do código fonte para o diretório de trabalho
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta que sua aplicação Node.js usa internamente (do seu index.ts)
EXPOSE 3000

# Comando para rodar a aplicação quando o container iniciar
# Usaremos 'npm run start' que configuraremos no package.json
CMD ["npm", "run", "start"]