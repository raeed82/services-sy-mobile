@echo off
REM ====================================================
REM   منصة الخدمات السورية - بناء ملف AAB
REM   Build Script for Android App Bundle
REM ====================================================

echo.
echo ========================================
echo   منصة الخدمات السورية
echo   Services-sy Mobile App
echo ========================================
echo.

REM التحقق من Java
echo [1/5] التحقق من Java...
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ خطأ: Java غير مثبت
    echo الرجاء تثبيت Java من: https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
)
echo ✅ Java متاح

REM التحقق من Node.js
echo.
echo [2/5] التحقق من Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ خطأ: Node.js غير مثبت
    echo الرجاء تثبيت Node.js من: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js متاح

REM تثبيت المكتبات
echo.
echo [3/5] تثبيت المكتبات...
call npm install
if errorlevel 1 (
    echo ❌ خطأ في تثبيت المكتبات
    pause
    exit /b 1
)
echo ✅ تم تثبيت المكتبات

REM بناء ملف AAB
echo.
echo [4/5] بناء ملف AAB...
echo هذا قد يستغرق 20-30 دقيقة...
call npm run build:android
if errorlevel 1 (
    echo ❌ خطأ في بناء AAB
    pause
    exit /b 1
)
echo ✅ تم بناء AAB بنجاح

REM عرض موقع الملف
echo.
echo [5/5] البحث عن الملف الناتج...
if exist "android\app\build\outputs\bundle\release\app-release.aab" (
    echo.
    echo ========================================
    echo ✅ تم البناء بنجاح!
    echo ========================================
    echo.
    echo 📍 موقع الملف:
    echo %cd%\android\app\build\outputs\bundle\release\app-release.aab
    echo.
    echo 📦 حجم الملف:
    for %%A in ("android\app\build\outputs\bundle\release\app-release.aab") do (
        echo %%~zA bytes
    )
    echo.
    echo 🚀 الملف جاهز للنشر على Google Play!
    echo.
) else (
    echo ❌ لم يتم العثور على ملف AAB
    echo تحقق من الأخطاء أعلاه
)

echo.
pause
