@echo off
chcp 65001 >nul
cd /d "%~dp0"
title CliCar app - Landing page

where node >nul 2>nul
if errorlevel 1 goto semnode

echo Verificando dependencias...
call npm install --no-audit --no-fund
if errorlevel 1 goto falha

echo.
echo Iniciando em http://localhost:5173 - feche esta janela para parar.
call npm run dev -- --open
pause
exit /b 0

:semnode
echo Node.js nao foi encontrado neste computador.
echo Instale a versao LTS em https://nodejs.org e execute este arquivo de novo.
pause
exit /b 1

:falha
echo Falha ao instalar as dependencias. Verifique sua conexao e tente de novo.
pause
exit /b 1
