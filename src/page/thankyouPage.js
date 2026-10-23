import { Link } from "react-router-dom";

const ThankyouPage = () => (
  <main className="status-page">
    <section className="status-card">
      <div className="status-card__icon status-card__icon--success" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        </svg>
      </div>
      <h1>Registrasi Berhasil</h1>
      <p>Terima kasih atas registrasi Anda untuk event <b>Job Fair Bidang Konstruksi Kota Tangerang</b> dan ataupun Kabupaten Tangerang. Harap screenshoot halaman terakhir ini dan tunjukkan kepada petugas registrasi kami beserta Kartu Identitas / KTP Anda di lokasi Acara pada hari H</p>
      <Link to="/" className="status-card__button">Kembali ke Beranda</Link>
    </section>
  </main>
);

export default ThankyouPage;
