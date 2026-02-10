# 🚀 البدء السريع - Windows

## الطريقة الأسهل (3 خطوات فقط)

### 1️⃣ تثبيت المتطلبات
تأكد من تثبيت:
- **Java**: https://www.oracle.com/java/technologies/downloads/
- **Node.js**: https://nodejs.org/
- **Android Studio**: https://developer.android.com/studio

### 2️⃣ تشغيل البناء
اختر واحدة من الطرق التالية:

#### الطريقة أ: ملف Batch (الأسهل)
1. افتح مجلد المشروع
2. انقر مرتين على `build.bat`
3. انتظر انتهاء البناء

#### الطريقة ب: PowerShell
1. افتح PowerShell كمسؤول
2. انتقل إلى مجلد المشروع
3. شغّل:
```powershell
.\build.ps1
```

#### الطريقة ج: يدوياً
```powershell
npm install
npm run build:android
```

### 3️⃣ الملف الناتج
ستجد الملف في:
```
android\app\build\outputs\bundle\release\app-release.aab
```

---

## ⏱️ الوقت المتوقع
- **المرة الأولى**: 30-45 دقيقة
- **المرات التالية**: 15-20 دقيقة

---

## 📤 النشر على Google Play

1. اذهب إلى [Google Play Console](https://play.google.com/console)
2. اختر التطبيق
3. اذهب إلى "Release" → "Production"
4. اضغط "Create new release"
5. حمّل ملف `app-release.aab`
6. أضف وصف الإصدار
7. اضغط "Review and roll out to production"

---

## ❓ مشاكل شائعة

### "java: command not found"
- تأكد من تثبيت Java
- أعد تشغيل PowerShell

### "npm: command not found"
- تأكد من تثبيت Node.js
- أعد تشغيل PowerShell

### "Android SDK not found"
- ثبّت Android Studio
- افتحه وحمّل SDK

---

## ✅ تم!

تهانينا! ملف AAB جاهز للنشر! 🎉
