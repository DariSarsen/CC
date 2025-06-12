# Используем Node.js 22
FROM node:22

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
# Префикс 'frontend/' убран
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код фронтенда
COPY . .

# Открываем порт для фронтенда (соответствует порту в docker-compose.yml)
EXPOSE 5173

# Команда для запуска в режиме разработки
CMD ["npm", "run", "dev"]
