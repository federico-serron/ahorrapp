# Etapa 1: Construcción del frontend
FROM node:18 AS frontend-builder

WORKDIR /app

# Copiamos el package.json y package-lock.json de CRA (están en raíz)
COPY package.json package-lock.json* ./

RUN npm install

# Copiamos el resto del código (React)
COPY . .

RUN npm run build


# Etapa 2: Backend con pipenv
FROM python:3.10-slim AS backend

WORKDIR /app

# Instalar dependencias del sistema y pipenv
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc libpq-dev curl build-essential \
    && pip install pipenv \
    && apt-get clean

# Copiar Pipfile y Pipfile.lock
COPY Pipfile Pipfile.lock* ./

RUN pipenv install

# Copiar solo el código backend (src/) y el frontend ya compilado
COPY src/ ./src/
COPY --from=frontend-builder /app/dist ./src/front/build

# Variables de entorno
ENV PORT=3001
ENV FLASK_APP=src/wsgi.py

CMD ["pipenv", "run", "gunicorn", "wsgi:application", "--chdir", "src", "--bind", "0.0.0.0:3001"]