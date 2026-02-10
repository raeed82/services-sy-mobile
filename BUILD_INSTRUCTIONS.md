# تعليمات البناء السريع

## 🚀 البناء المحلي (للاختبار)

### المتطلبات:
- Node.js v18+
- npm أو pnpm
- Expo CLI
- Android Studio (لـ Android)
- Xcode (لـ iOS - macOS فقط)

### الخطوات:

#### 1. تثبيت المكتبات
```bash
cd /home/ubuntu/services-sy-mobile
npm install
# أو
pnpm install
```

#### 2. تثبيت Expo CLI
```bash
npm install -g expo-cli
```

#### 3. التشغيل على جهازك
```bash
# تشغيل عام (اختر المنصة)
npm start

# تشغيل مباشر على Android
npm run android

# تشغيل مباشر على iOS (macOS فقط)
npm run ios

# تشغيل على الويب
npm run web
```

---

## 🏗️ البناء للنشر (EAS Build)

### المتطلبات:
- حساب Expo (مجاني)
- EAS CLI

### الخطوات:

#### 1. تثبيت EAS CLI
```bash
npm install -g eas-cli
```

#### 2. تسجيل الدخول
```bash
eas login
```

#### 3. بناء APK (Google Play)
```bash
# للاختبار (APK)
eas build --platform android --type apk

# للإنتاج (AAB)
eas build --platform android --type app-bundle
```

#### 4. بناء IPA (App Store)
```bash
eas build --platform ios
```

#### 5. عرض حالة البناء
```bash
eas build:list
```

---

## 📦 الملفات الناتجة

### Android:
- **APK**: ملف قابل للتثبيت مباشرة على الهاتف
- **AAB**: ملف للنشر على Google Play (الصيغة الموصى بها)

### iOS:
- **IPA**: ملف قابل للتثبيت على App Store

---

## 🔑 إعدادات مهمة

### في `app.json`:
```json
{
  "expo": {
    "name": "منصة الخدمات السورية",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.servicesy.mobile"
    },
    "android": {
      "package": "com.servicesy.mobile"
    }
  }
}
```

### في `eas.json`:
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

## 📱 الاختبار على الهاتف

### على Android:
1. ثبّت Expo Go من Google Play
2. شغّل `npm start`
3. امسح QR Code بكاميرا الهاتف
4. سيفتح التطبيق في Expo Go

### على iOS:
1. ثبّت Expo Go من App Store
2. شغّل `npm start`
3. امسح QR Code بكاميرا الهاتف
4. سيفتح التطبيق في Expo Go

---

## 🐛 استكشاف الأخطاء

### مشكلة: "Metro bundler is not running"
```bash
# الحل:
npm start -- --reset-cache
```

### مشكلة: "Port 19000 is already in use"
```bash
# الحل:
npm start -- --port 19001
```

### مشكلة: "Build failed"
```bash
# الحل:
rm -rf node_modules
npm install
npm start -- --reset-cache
```

---

## 📊 معلومات الملفات

| الملف | الحجم | الاستخدام |
|------|-------|----------|
| APK | ~50-80 MB | اختبار على Android |
| AAB | ~40-60 MB | نشر على Google Play |
| IPA | ~60-100 MB | نشر على App Store |

---

## ✅ قائمة التحقق

- [ ] تثبيت جميع المكتبات
- [ ] اختبار التطبيق محلياً
- [ ] اختبار على أجهزة حقيقية
- [ ] التحقق من نظام Fallback
- [ ] إضافة الأيقونات والصور
- [ ] تحديث المعلومات في app.json
- [ ] بناء APK/AAB لـ Android
- [ ] بناء IPA لـ iOS
- [ ] تحميل على المتاجر

---

## 🔗 روابط مفيدة

- [Expo Docs](https://docs.expo.dev)
- [EAS Build](https://docs.expo.dev/build/introduction)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)

---

آخر تحديث: 2026-02-10
