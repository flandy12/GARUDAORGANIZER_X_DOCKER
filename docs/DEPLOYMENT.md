# Panduan Deployment Garuda Organizer

Dokumen ini menjelaskan deployment frontend React ke
`https://garudaorganizer.com` dan `https://www.garudaorganizer.com` menggunakan
Docker Compose, Nginx, dan Let's Encrypt.

## 1. Arsitektur production

```text
Pengunjung
    |
    | HTTPS :443
    v
Nginx pada VPS (SSL dan reverse proxy)
    |
    | http://127.0.0.1:3000
    v
Container frontend (Nginx)
    |
    v
Static React build

Browser ------------------> https://cms.garudaorganizer.com/api/
```

Container hanya dipublikasikan ke loopback VPS. Port 3000 tidak perlu dibuka
ke internet karena seluruh trafik publik melewati Nginx utama.

## 2. Berkas deployment

- `Dockerfile.prod`: membangun React dengan Node.js lalu menyalin hasilnya ke
  image Nginx.
- `compose.prod.yml`: menjalankan frontend production pada
  `127.0.0.1:3000`.
- `nginx/default.conf`: menyajikan static asset dan menangani fallback
  React Router ke `index.html`.
- `deploy/nginx/garudaorganizer.com.conf`: reverse proxy pada Nginx VPS.
- `.env.production.example`: contoh konfigurasi build production.

`compose.yml` dan `Dockerfile` lama tetap dipakai untuk development lokal.

## 3. Prasyarat VPS

Pastikan VPS sudah memiliki:

- Linux VPS dengan akses SSH dan `sudo`.
- Docker Engine dan Docker Compose v2.
- Git.
- Nginx pada host VPS.
- Certbot beserta plugin Nginx.
- Port publik 80 dan 443 dapat diakses.

Periksa instalasi:

```bash
docker --version
docker compose version
nginx -v
certbot --version
git --version
```

Jika UFW digunakan, pastikan SSH tidak terblokir sebelum mengubah firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw status
```

## 4. Konfigurasi DNS

Buat DNS record berikut pada penyedia domain:

| Type | Name | Tujuan |
| --- | --- | --- |
| `A` | `@` | IP publik VPS |
| `CNAME` | `www` | `garudaorganizer.com` |

Periksa propagasi DNS dari komputer atau VPS:

```bash
dig +short garudaorganizer.com
dig +short www.garudaorganizer.com
```

Kedua domain harus mengarah ke VPS sebelum Certbot dijalankan.

## 5. Menyiapkan source code

Contoh lokasi deployment:

```bash
sudo mkdir -p /var/www/garudaorganizer
sudo chown "$USER":"$USER" /var/www/garudaorganizer
git clone <URL_REPOSITORY> /var/www/garudaorganizer
cd /var/www/garudaorganizer
```

Jika repository sudah tersedia:

```bash
cd /var/www/garudaorganizer
git status --short
git pull --ff-only
```

Jangan menjalankan `git reset --hard` pada server yang masih memiliki perubahan
lokal yang belum disimpan.

## 6. Konfigurasi environment production

Buat konfigurasi khusus VPS:

```bash
cp .env.production.example .env.production
chmod 600 .env.production
nano .env.production
```

Nilai dasarnya:

```dotenv
REACT_APP_URL_API=https://cms.garudaorganizer.com/api/
REACT_APP_URL_API_KEY=
REACT_APP_URL_IMG=https://cms.garudaorganizer.com/
REACT_APP_MAINTENANCE=false
```

Semua variabel `REACT_APP_*` ditanam ke JavaScript ketika image dibangun.
Perubahan environment selalu membutuhkan build ulang. Nilai
`REACT_APP_URL_API_KEY` dapat dilihat oleh pengunjung melalui browser, sehingga
tidak boleh dianggap sebagai secret server. Backend tetap harus melakukan
autorisasi, pembatasan akses, dan validasi request.

Jangan commit `.env.production` ke Git.

## 7. Build dan menjalankan container

Dari root repository:

```bash
docker compose --env-file .env.production -f compose.prod.yml config --quiet
docker compose --env-file .env.production -f compose.prod.yml build --pull
docker compose --env-file .env.production -f compose.prod.yml up -d
docker compose --env-file .env.production -f compose.prod.yml ps
```

Periksa respons internal dan log:

```bash
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:3000/about
docker compose --env-file .env.production -f compose.prod.yml logs --tail 100 frontend
```

Halaman `/` dan `/about` harus merespons `HTTP 200`.

## 8. Memasang reverse proxy Nginx

Salin konfigurasi yang sudah disediakan:

```bash
sudo cp deploy/nginx/garudaorganizer.com.conf /etc/nginx/sites-available/garudaorganizer.com.conf
sudo ln -s /etc/nginx/sites-available/garudaorganizer.com.conf /etc/nginx/sites-enabled/garudaorganizer.com.conf
sudo nginx -t
sudo systemctl reload nginx
```

Jika symbolic link sudah ada, jangan membuat link kedua. Setelah reload,
periksa HTTP publik:

```bash
curl -I http://garudaorganizer.com
curl -I http://www.garudaorganizer.com
```

Jika distribusi Linux tidak menggunakan `sites-available` dan `sites-enabled`,
tempatkan konfigurasi tersebut di direktori include Nginx yang berlaku, seperti
`/etc/nginx/conf.d/`.

## 9. Mengaktifkan HTTPS

Jalankan Certbot setelah DNS dan HTTP berfungsi:

```bash
sudo certbot --nginx -d garudaorganizer.com -d www.garudaorganizer.com
sudo nginx -t
sudo systemctl reload nginx
```

Periksa sertifikat dan auto-renewal:

```bash
curl -I https://garudaorganizer.com
curl -I https://www.garudaorganizer.com/about
sudo certbot renew --dry-run
```

## 10. Konfigurasi CMS API

Backend `cms.garudaorganizer.com` harus mengizinkan origin berikut pada CORS:

```text
https://garudaorganizer.com
https://www.garudaorganizer.com
```

Jangan gunakan URL HTTP untuk API pada halaman HTTPS karena browser akan
memblokir mixed content.

## 11. Deployment pembaruan

Sebelum update, simpan commit aktif sebagai referensi rollback:

```bash
cd /var/www/garudaorganizer
git rev-parse HEAD
git status --short
git pull --ff-only
docker compose --env-file .env.production -f compose.prod.yml build --pull
docker compose --env-file .env.production -f compose.prod.yml up -d
docker compose --env-file .env.production -f compose.prod.yml ps
curl -I https://garudaorganizer.com
```

`up -d` akan mengganti container setelah image baru selesai dibangun. Jangan
hapus image lama sebelum release baru selesai diverifikasi.

## 12. Rollback

Gunakan hash commit yang dicatat sebelum deployment:

```bash
cd /var/www/garudaorganizer
git status --short
git switch --detach <COMMIT_SEBELUMNYA>
docker compose --env-file .env.production -f compose.prod.yml build
docker compose --env-file .env.production -f compose.prod.yml up -d
curl -I https://garudaorganizer.com
```

Setelah masalah diperbaiki, kembali ke branch deployment:

```bash
git switch <BRANCH_DEPLOYMENT>
git pull --ff-only
```

Hentikan rollback jika `git status --short` menunjukkan perubahan lokal yang
belum dipahami atau belum disimpan.

## 13. Checklist verifikasi

- `docker compose ... ps` menampilkan service `frontend` dalam keadaan sehat.
- `http://127.0.0.1:3000/` merespons 200 dari dalam VPS.
- `https://garudaorganizer.com` merespons 200.
- `https://www.garudaorganizer.com` dapat diakses atau diarahkan dengan benar.
- Membuka `/about` secara langsung tidak menghasilkan 404.
- Asset CSS, JavaScript, dan gambar termuat tanpa mixed-content error.
- Request API menuju `https://cms.garudaorganizer.com/api/` berhasil.
- Sertifikat mencakup domain utama dan `www`.
- Tampilan desktop dan mobile sudah diperiksa dengan hard refresh.

## 14. Troubleshooting

### Domain menghasilkan 502 Bad Gateway

Periksa container dan port internal:

```bash
docker compose --env-file .env.production -f compose.prod.yml ps
docker compose --env-file .env.production -f compose.prod.yml logs --tail 150 frontend
curl -I http://127.0.0.1:3000
sudo ss -lntp | grep ':3000'
```

### Route seperti `/about` menghasilkan 404

Pastikan image menggunakan `nginx/default.conf` yang memiliki:

```nginx
try_files $uri $uri/ /index.html;
```

Kemudian build ulang image.

### Tampilan masih versi lama

Periksa commit aktif lalu paksa build tanpa cache:

```bash
git rev-parse HEAD
docker compose --env-file .env.production -f compose.prod.yml build --no-cache
docker compose --env-file .env.production -f compose.prod.yml up -d
```

Setelah itu lakukan hard refresh pada browser.

### URL API tidak berubah

Variabel React dibaca saat build, bukan ketika container sudah berjalan.
Pastikan `.env.production` benar lalu jalankan kembali `build` dan `up -d`.

### Browser menampilkan error CORS

Periksa konfigurasi CORS pada CMS dan pastikan origin menyertakan skema HTTPS
serta domain yang tepat. CORS tidak dapat diperbaiki hanya dari frontend.

### Certbot gagal menerbitkan sertifikat

Pastikan DNS sudah mengarah ke VPS, port 80 dapat diakses publik, dan Nginx
merespons domain sebelum menjalankan Certbot kembali:

```bash
sudo nginx -t
curl -I http://garudaorganizer.com
sudo journalctl -u nginx --since "30 minutes ago" --no-pager
```

## 15. Menghentikan aplikasi

Gunakan hanya ketika frontend memang perlu dihentikan:

```bash
docker compose --env-file .env.production -f compose.prod.yml down
```

Perintah tersebut menghentikan frontend dan menyebabkan domain tidak dapat
melayani aplikasi sampai service dijalankan kembali.
