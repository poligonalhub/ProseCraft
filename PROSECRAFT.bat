@echo off
title ProseCraft // Poligonal
cd /d "%~dp0"

echo ========================================================
echo   PROSECRAFT // MANUSCRITO & STORYBOARD (STANDALONE)
echo ========================================================
echo.
echo [+] Iniciando servidor e abrindo ProseCraft em http://127.0.0.1:1421...
echo.

start /min cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:1421"
npm run dev

pause
