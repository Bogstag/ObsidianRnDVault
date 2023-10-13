---
tags: [filsuffix/bat, code]
---
Batch skript för att flytta filer av en viss typ till en ny mapp och sedan ta bort den filtypen från orginal mappen.

Kommando
```cmd
movefiles.bat cheat-sheets-main\*.md cheat-sheets-main-md\
```

Skript
```batch
Rem Batch file to move files
Xcopy /D /V /S %1 %2

Rem If the Xcopy process is successful (0), then delete the files at the source.
if errorlevel 0 (

echo Xcopy process completed successfully
del /Q /S %1
exit /B
)

Rem Errorlevel is not 0
echo The copy process has failed.
```