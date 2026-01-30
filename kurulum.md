# 🚀 Azfin Consulting - Kurulum Kılavuzu

Bu belge, Azfin Consulting projesinin sunucuya (VPS/Local) kurulumu ve yayına alınması için gerekli adımları içermektedir.

## 📋 Gereksinimler
- **Node.js**: v18.0.0 veya üzeri
- **npm**: v8.0.0 veya üzeri
- **Portlar**: 
  - Frontend: `5173` (Vite varsayılan)
  - Backend (Upload Server): `5001`

---

## 🛠️ Kurulum Adımları

### 1. Dosyaları Sunucuya Yükleyin
Proje dosyalarını sunucunuzda belirlediğiniz bir klasöre (`Örn: /var/www/azfin`) kopyalayın.

### 2. Bağımlılıkları Yükleyin
Terminali açın ve proje ana dizininde aşağıdaki komutu çalıştırın:
```bash
npm install
```

### 3. Backend Sunucusunu Hazırlayın
Görsel yükleme işlemlerinin çalışması için backend sunucusunun (server/index.js) çalışması gerekir.
- `uploads/` klasörünün ana dizinde olduğundan veya backend tarafından otomatik oluşturulduğundan emin olun.
- Sunucuda yazma izinlerini kontrol edin.

### 4. Uygulamayı Çalıştırma

#### Geliştirme Modu (Development)
Her iki servisi de aynı anda başlatmak için:
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (Uploads)
npm run server
```

#### Canlı Ortam (Production - Önerilen)
Canlı ortamda uygulamayı sürekli açık tutmak için `pm2` gibi bir proses yöneticisi kullanmanız önerilir:

```bash
# PM2 Yükleme (Eğer yoksa)
npm install pm2 -g

# Servisleri Başlatma
pm2 start server/index.js --name "azfin-backend"
pm2 start "npm run dev" --name "azfin-frontend"

# Durumu Kontrol Etme
pm2 status
```

---

## 🔐 Admin Paneli ve İlk Kurulum

1. Tarayıcıda `/admin/login` adresine gidin.
2. Sisteme kayıtlı admin yoksa, karşınıza **"Admin Hesabı Yarat"** ekranı gelecektir.
3. Belirlediğiniz kullanıcı adı ve şifre ile ilk admin kaydını yapın.
4. Giriş yaptıktan sonra **"Tənzimləmələr"** (Settings) sekmesinden site bilgilerini güncelleyebilirsiniz.

---

## 📁 Dosya Yapısı ve Önemli Notlar
- **`context/DataContext.tsx`**: Tüm site verileri (hizmetler, bloglar vb.) burada yönetilir ve `localStorage` üzerinde saklanır.
- **`server/index.js`**: Multer tabanlı görsel yükleme sunucusudur. Görseller `uploads/` klasörüne kaydedilir.
- **`types.ts`**: Veri yapılarının (TypeScript interfaces) bulunduğu dosyadır.

## 🆘 Sorun Giderme
- **Görsel yükleme hatası**: `localhost:5001` portunun açık olduğundan ve sunucunun çalıştığından emin olun.
- **Yönlendirme hatası**: Uygulama `BrowserRouter` kullanmaktadır. Eğer Nginx veya Apache kullanıyorsanız, tüm istekleri `index.html`'e yönlendirecek konfigürasyon (fallback) yapmanız gerekebilir.

---
*Hazırlayan: Ali Yabuz*
