@echo off
title EcoTrend - Servidor Local
echo ========================================================
echo         ECOTREND - E-COMMERCE SUSTENTAVEL
echo ========================================================
echo Iniciando o servidor local e abrindo a aplicacao no navegador...
echo.

:: Abre o navegador padrão na porta 3000
start "" http://localhost:3000

:: Inicia o servidor HTTP embutido do Python na porta 3000
python -m http.server 3000

