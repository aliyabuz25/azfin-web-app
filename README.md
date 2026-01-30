# Azfin Consulting LLC - Professional Web Platform

Azfin Consulting MMC üçün hazırlanmış müasir, dinamik və tam idarəolunan veb platforma. Bu layihə həm istifadəçilər üçün premium dizaynlı ön hissəni (frontend), həm də idarəçilər üçün AdminLTE əsaslı idarəetmə panelini (backend/admin) özündə birləşdirir.

## 🚀 Xüsusiyyətlər

- **Dinamik Məzmun İdarəetməsi**: Saytdakı bütün yazılar, xidmətlər, bloqlar və akademiya məlumatları Admin panelindən dəyişdirilə bilər.
- **AdminLTE Dashboard**: Peşəkar və funksional idarəetmə paneli.
- **Müraciət Sistemi**: Müştəri sorğularının real-vaxt rejimində qəbulu və idarə edilməsi.
- **Tam Localizasiya**: Bütün UI etiketlərinin (Navbar, Footer, Düymələr) dinamik idarə edilməsi.
- **Responsive Dizayn**: Bütün cihazlarda (Mobil, Planşet, Masaüstü) mükəmməl görünüş.
- **Docker Dəstəyi**: Sürətli və asan quraşdırma üçün Docker konfiqurasiyası.

## 🛠 Texnologiyalar

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons.
- **Backend / API**: Node.js, Express.
- **Data Storage**: JSON-based persistent storage (Verilənlər bazası tələb olunmur).
- **File Management**: Multer (Şəkil yükləmələri üçün).

## 🐳 Docker ilə Quraşdırma

Sistemi Docker vasitəsilə bir neçə saniyə ərzində quraşdıra bilərsiniz. Bu üsul bütün asılılıqları daxildə həll edir.

### 1. Docker Compose ilə başladın

Layihənin kök qovluğunda terminalı açın və aşağıdakı əmri icra edin:

```bash
docker-compose up -d --build
```

### 2. İzləyin

Sistem hazır olduqdan sonra aşağıdakı ünvanlardan istifadə edə bilərsiniz:
- **Veb Sayt**: `http://localhost:5001`
- **Admin Panel**: `http://localhost:5001/admin/login`

**Qeyd:** `data.json`, `requests.json` və `uploads/` qovluğu volume olaraq bağlanıb, yəni konteyner silinsə belə məlumatlarınız itməyəcək.

---

## 💻 Yerli (Manual) Quraşdırma

Docker olmadan quraşdırmaq istəyirsinizsə:

1. **Asılılıqları yükləyin:**
   ```bash
   npm install
   ```

2. **Frontend və Serveri eyni anda başladın:**
   ```bash
   npm run dev:all
   ```

3. **Brauzerdə açın:**
   - Frontend: `http://localhost:5173`
   - API Server: `http://localhost:5001`

---

## 📁 Qovluq Strukturu

- `/components`: Təkrar istifadə edilə bilən UI komponentləri.
- `/pages`: Səhifə komponentləri.
- `/pages/admin`: Admin panelinə aid səhifələr və menecerlər.
- `/server`: Node.js Express API serveri.
- `/context`: Data və Auth idarəetməsi üçün React Context.
- `/public`: Statik fayllar.
- `data.json`: Saytın dinamik məlumatları (Database).

---

© 2024 Azfin Consulting. Developed by Ali Yabuz.

---

## Production Deployment (Portainer + Traefik)

For the Octotech server, deployment uses prebuilt images and Traefik labels (no host ports).
See `DEPLOY.md` for the exact steps, paths, and verification commands.
