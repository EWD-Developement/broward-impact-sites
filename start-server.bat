@echo off
title Broward Impact Showcase Local Web Server
cd /d "%~dp0"
echo ========================================================
echo   Starting local web server on http://localhost:8080
echo   Press Ctrl+C to stop the server
echo ========================================================
start "" "http://localhost:8080/index.html"
python -m http.server 8080
pause
