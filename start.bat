@echo off
echo ========================================
echo Iniciando aplicacion 4x
echo ========================================
echo.

echo [1/2] Iniciando backend...
start "Backend Server" cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo [2/2] Iniciando frontend...
start "Frontend Angular" cmd /k "cd ClientApp && npm start"

echo.
echo ========================================
echo Aplicacion iniciada!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
echo ========================================
pause

