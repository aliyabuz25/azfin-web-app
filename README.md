# Azfin Consulting - Modern CMS & Audit Platform

Azfin Consulting üçün hazırlanmış, müasir texnologiyalarla təchiz olunmuş audit və konsaltinq platforması. Bu layihə həm istifadəçilər üçün interaktiv frontend, həm də idarəçilər üçün premium admin panelini özündə birləşdirir.

## 🚀 Əsas Yeniliklər və Özəlliklər

### 💎 Premium Admin Paneli
*   **Modern Login:** Glassmorphism dizayn üslubunda, dark mode dəstəkli və dinamik effektli giriş səhifəsi.
*   **İlk Giriş Quraşdırması (Auto-Setup):** Sistem ilk dəfə açıldıqda avtomatik olaraq admin qeydiyyatı tələb edir, bu da təhlükəsizliyi maksimuma çatdırır.
*   **Müraciətlərin İdarə Edilməsi:** Saytdan gələn bütün müraciətlər (Əlaqə, Akademiya, Xidmət müraciətləri) mərkəzi bazada toplanır və statuslara görə qruplaşdırılır.
*   **İstifadəçi Meneceri:** Admin və Redaktorların əlavə edilməsi, silinməsi və məlumatlarının yenilənməsi.

### 🛠 Texniki Göstəricilər
*   **Frontend Port:** 901 (Vite tərəfindən idarə olunur).
*   **Backend API:** Node.js & Express.js (Port: 5000).
*   **Təhlükəsizlik:** JWT (JSON Web Token) əsaslı avtorizasiya və Bcrypt ilə şifrələmə.
*   **Məlumat Bazası:** JSON əsaslı dinamik fayl sistemi (hər bir kateqoriya üçün avtomatik backup dəstəyi ilə).

### 📱 İstifadəçi Tərəfi (Frontend)
*   **Dinamik Məzmun:** Xidmətlər, bloqlar, təlimlər və statistikalar tamamilə admin panelindən idarə olunur.
*   **Interaktiv Formlar:** Bütün formlar real-time validasiya və uğurlu göndərmə animasiyaları ilə təchiz edilib.
*   **Responsive Dizayn:** Bütün cihazlarda (mobil, planşet, desktop) mükəmməl görünüş.

## 🛠 Quraşdırma (Installation)

1.  **Repozitoriyanı klonlayın:**
    ```bash
    git clone https://github.com/aliyabuz25/azfin-web-app.git
    cd azfin-web-app
    ```

2.  **Asılılıqları yükləyin:**
    ```bash
    npm install
    ```

3.  **Serveri işə salın (Backend & Frontend):**
    ```bash
    # Backend üçün
    node server/index.js
    
    # Frontend üçün (Port 901)
    npm run dev
    ```

## 🔐 Admin Girişi
Sistemi ilk dəfə quraşdırdıqdan sonra `/admin/login` ünvanına keçid edərək ilk admin hesabınızı yaradın. Bundan sonra bütün sayt məzmununu idarə edə biləcəksiniz.

---
© 2024 Azfin Consulting. Bütün hüquqlar qorunur.
