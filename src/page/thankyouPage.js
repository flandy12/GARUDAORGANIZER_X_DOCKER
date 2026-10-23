import SEO from "../compoments/seo";

const ThankyouPage = () => {
    return (
      <>
        <SEO
          title="Registrasi Berhasil | Garuda Organizer"
          meta_description="Konfirmasi registrasi acara Garuda Organizer."
          noindex
        />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="bg-white p-8 rounded-2xl shadow-md text-center max-w-lg">
                <div class="flex justify-center mb-4">
                <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12l2 2l4 -4m5 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z"/>
                </svg>
                </div>
                <h1 class="text-2xl font-bold text-gray-800">Registrasi Berhasil</h1>
                <p class="text-gray-600 mt-2">Terima kasih atas registrasi Anda untuk event <b>Job Fair Bidang Konstruksi Kota Tangerang</b> dan ataupun Kabupaten Tangerang. Harap screenshoot halaman terakhir ini dan tunjukkan kepada petugas registrasi kami beserta  Kartu Identitas / KTP Anda di lokasi Acara pada hari H</p>

                <a href="/" class="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Kembali ke Beranda
                </a>
            </div>
        </div>
      </>
    );
}

export default ThankyouPage;
