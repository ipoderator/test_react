#!/bin/bash
cd /Users/glebchurkin/products-app

# Установка зависимостей, если они не установлены
if [ ! -d "node_modules" ]; then
  echo "Устанавливаю зависимости..."
  npm install
fi

# Запуск сервера на порту 5002
echo "Запускаю сервер на порту 5002..."
npm run dev:5002

