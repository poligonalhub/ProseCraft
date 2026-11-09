@echo off
title ProseCraft // Poligonal
cd /d "%~dp0"

echo ========================================================
echo   PROSECRAFT // MANUSCRITO & STORYBOARD (STANDALONE)
echo ========================================================
echo.
echo [+] Abrindo ProseCraft em http://localhost:1421...
echo.

start http://localhost:1421
npm run dev

pause
