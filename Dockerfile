# Usar la imagen oficial de NGINX
FROM nginx:alpine

# El directorio en el contenedor donde NGINX servirá los archivos
WORKDIR /usr/share/nginx/html

# Copiar los archivos construidos de Angular (ubicados en dist/frontend/browser) a la carpeta de NGINX
COPY ./dist/frontend-tareas/browser /usr/share/nginx/html

# Exponer el puerto 80 (puerto predeterminado de NGINX)
EXPOSE 80

# Iniciar NGINX en primer plano (en modo "foreground")
CMD ["nginx", "-g", "daemon off;"]
