# Use the official Node.js image as base
FROM node:14-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Construa a aplicação Next.js para produção
RUN npm run build

# Exponha a porta em que a aplicação Next.js será executada
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "app"]
