# Используем Node.js 22
FROM node:22

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
# Префикс 'backend/' убран, так как контекст сборки уже находится в этой папке
COPY package*.json ./

# Устанавливаем зависимости
# Рекомендуется добавить sequelize-cli в devDependencies вашего package.json
# RUN npm install --production # Используйте для продакшена, чтобы не ставить dev зависимости
RUN npm install

# Копируем весь код проекта из контекста сборки
COPY . .

# Открываем порт API
EXPOSE 3000

# Команда для запуска (будет переопределена в docker-compose, но полезна для Railway)
CMD ["npm", "start"]
