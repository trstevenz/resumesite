@echo off
title Stephen Raj 3D Resume Server
echo ===================================================
echo   INITIALIZING SYSTEM: 3D PORTFOLIO DEV SERVER
echo ===================================================
echo.
cd /d "%~dp0"
echo System Directory: %cd%
echo Launching server via npm...
echo.
call npm run dev
echo.
echo ===================================================
echo   SERVER TERMINATED OR SHUT DOWN
echo ===================================================
pause
