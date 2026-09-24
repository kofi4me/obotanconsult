@echo off
cd /d "%~dp0"
node --experimental-strip-types scripts/setup-admin.mjs
pause
