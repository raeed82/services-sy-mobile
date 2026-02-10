# ====================================================
#   منصة الخدمات السورية - بناء ملف AAB
#   Build Script for Android App Bundle
# ====================================================

Write-Host ""
Write-Host "========================================"
Write-Host "   منصة الخدمات السورية" -ForegroundColor Green
Write-Host "   Services-sy Mobile App" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""

# التحقق من Java
Write-Host "[1/5] التحقق من Java..." -ForegroundColor Cyan
try {
    java -version 2>&1 | Out-Null
    Write-Host "✅ Java متاح" -ForegroundColor Green
} catch {
    Write-Host "❌ خطأ: Java غير مثبت" -ForegroundColor Red
    Write-Host "الرجاء تثبيت Java من: https://www.oracle.com/java/technologies/downloads/" -ForegroundColor Yellow
    Read-Host "اضغط Enter للخروج"
    exit 1
}

# التحقق من Node.js
Write-Host ""
Write-Host "[2/5] التحقق من Node.js..." -ForegroundColor Cyan
try {
    node --version | Out-Null
    Write-Host "✅ Node.js متاح" -ForegroundColor Green
} catch {
    Write-Host "❌ خطأ: Node.js غير مثبت" -ForegroundColor Red
    Write-Host "الرجاء تثبيت Node.js من: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "اضغط Enter للخروج"
    exit 1
}

# تثبيت المكتبات
Write-Host ""
Write-Host "[3/5] تثبيت المكتبات..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ خطأ في تثبيت المكتبات" -ForegroundColor Red
    Read-Host "اضغط Enter للخروج"
    exit 1
}
Write-Host "✅ تم تثبيت المكتبات" -ForegroundColor Green

# بناء ملف AAB
Write-Host ""
Write-Host "[4/5] بناء ملف AAB..." -ForegroundColor Cyan
Write-Host "هذا قد يستغرق 20-30 دقيقة..." -ForegroundColor Yellow
npm run build:android
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ خطأ في بناء AAB" -ForegroundColor Red
    Read-Host "اضغط Enter للخروج"
    exit 1
}
Write-Host "✅ تم بناء AAB بنجاح" -ForegroundColor Green

# عرض موقع الملف
Write-Host ""
Write-Host "[5/5] البحث عن الملف الناتج..." -ForegroundColor Cyan
$aabPath = "android\app\build\outputs\bundle\release\app-release.aab"
if (Test-Path $aabPath) {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "✅ تم البناء بنجاح!" -ForegroundColor Green
    Write-Host "========================================"
    Write-Host ""
    
    $file = Get-Item $aabPath
    Write-Host "📍 موقع الملف:" -ForegroundColor Cyan
    Write-Host $file.FullName
    Write-Host ""
    Write-Host "📦 حجم الملف:" -ForegroundColor Cyan
    Write-Host "$([math]::Round($file.Length / 1MB, 2)) MB"
    Write-Host ""
    Write-Host "🚀 الملف جاهز للنشر على Google Play!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ لم يتم العثور على ملف AAB" -ForegroundColor Red
    Write-Host "تحقق من الأخطاء أعلاه" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "اضغط Enter للخروج"
