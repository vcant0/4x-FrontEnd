#!/bin/bash

echo "========================================"
echo "Iniciando aplicacion 4x"
echo "========================================"
echo ""

echo "[1/2] Iniciando backend..."
cd server && npm start &
BACKEND_PID=$!

sleep 3

echo "[2/2] Iniciando frontend..."
cd ../ClientApp && npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Aplicacion iniciada!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:4200"
echo "========================================"
echo ""
echo "Presiona Ctrl+C para detener ambos servidores"

# Esperar a que el usuario presione Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

