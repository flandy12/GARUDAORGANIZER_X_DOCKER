import { useEffect, useState } from "react";

const HabitatPage = () =>{

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});


    const [otherJob, setOtherJob] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Data dikirim:", formData);
        // Handle form submission logic here
        try {
            const response = await fetch(process.env.REACT_APP_URL_API + 'job-fair-registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                // Jika status 422 (validasi gagal)
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.error("Validasi gagal:", errorData.errors);
    
                    // Simpan error ke state jika ingin ditampilkan di form
                    setErrors(errorData.errors);
    
                    // Atau tampilkan dengan alert
                    const messages = Object.values(errorData.errors)
                        .flat()
                        .join("\n");
                    alert("Validasi Gagal:\n" + messages);
                    

                    return;
                }
    
                throw new Error('Gagal mengirim data');
            }

            const data = await response.json();

            window.location.href = "/success"; // Redirect ke halaman sukses
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat mengirim data.");
        }
    };

    const handleSubmitOtherJob = (value) => {

        console.log("Other job selected:", value);
        return (event) => {
            event.preventDefault();
            setOtherJob(value);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        

        if (type === "checkbox") {
          if (name === "pendidikan") {
            // Checkbox grup: pendidikan
            setFormData((prev) => ({
              ...prev,
              pendidikan: {
                ...(prev.pendidikan || {}),
                [value]: checked
              }
            }));
          } else {
            // Checkbox tunggal
            setFormData((prev) => ({
              ...prev,
              [name]: checked ? 1 : 0
            }));
          }
        } else {
          // Input biasa dan radio
          setFormData((prev) => ({
            ...prev,
            [name]: value
          }));
        }

        setErrors({});
      };
      

    const handlePelatihanLainChange = (e) => {
        const value = e.target.value;
      
        // simpan ke formData
        setFormData((prev) => ({
          ...prev,
          pelatihan_lain: value,
        }));
      
        // jika "Iya", tampilkan field tambahan
        setOtherJob(value === "Iya");
      };

    return (
        <div className="registration-page flex flex-col items-center justify-center min-h-screen z-[100] relative bg-gray-100 p-10">
          
        <form className="registration-form xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm mx-auto bg-white p-5 xl:my-10 lg:my-10 md:my-10 sm:m-10 relative z-10" onSubmit={handleSubmit}>
         <img src="/images/asset/asset-bg.jpg" alt="Logo Habitat" className="mb-10" />
            <h1 className="text-xl font-bold text-center mb-5 text-gray-800">Formulir Pendaftaran Job Fair Bidang Konstruksi Kabupaten Tangerang 2025</h1>
              
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Email <span className="text-red-500">*</span></label>
                    <input onChange={handleChange} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto" name="email" required/>

                    {/* <span className="text-xs text-gray-500">*Pastikan email yang Anda masukkan benar, karena akan digunakan untuk mengirimkan informasi lebih lanjut mengenai acara.</span> */}

                    
                    {errors.email && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                            {errors.email.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm">
                                {error}
                            </p>
                            ))}
                        </div>
                        )}
                </div>
            
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input name="nama_lengkap" onChange={handleChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto   " required/>

                    {errors.nama_lengkap && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                            {errors.nama_lengkap.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm">
                                {error}
                            </p>
                            ))}
                        </div>
                        )}

                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Pilih Tanggal Acara <span className="text-red-500">*</span></label>
                    <div className="space-y-2">
                    {/* <label className="flex items-center">
                        <input onChange={handleChange} type="radio" name="tanggal_acara" value="12 Juli 2025" className="mr-2" required/> 12 Juli 2025 di Bale Kota Mall Tangerang
                    </label> */}
                    <label className="flex items-center">
                        <input onChange={handleChange} type="radio" name="tanggal_acara" value="19 Juli 2025" className="mr-2"/> 19 Juli 2025 di Aula Disnakertrans Kabupaten Tangerang
                    </label>
                    </div>

                    {errors.tanggal_acara && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.tanggal_acara.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir <span className="text-red-500">*</span></label>
                    <input name="tanggal_lahir" onChange={handleChange} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto  " required/>

                    {errors.tanggal_lahir && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.tanggal_lahir.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}

                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin <span className="text-red-500">*</span></label>
                    <div className="space-y-2">
                    <label className="flex items-center">
                        <input onChange={handleChange} type="radio" name="jenis_kelamin" value="Pria" className="mr-2" required/> Pria
                    </label>
                    <label className="flex items-center">
                        <input onChange={handleChange} type="radio" name="jenis_kelamin" value="Wanita" className="mr-2"/> Wanita
                    </label>
                    </div>

                    {errors.jenis_kelamin && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.jenis_kelamin.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}

                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Nomor HP <span className="text-red-500">*</span></label>
                    <input name="nomor_hp" onChange={handleChange} type="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto  " required/>

                    {errors.nomor_hp && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.nomor_hp.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">NIK <span className="text-red-500">*</span></label>
                    <input name="nik" onChange={handleChange} type="text" maxLength="16" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto  " required placeholder="Harap masukkan 16 digit NIK dengan benar"/>

                    {errors.nik && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.nik.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Alamat Domisili <span className="text-red-500">*</span></label>
                    <input onChange={handleChange} name="alamat_domisili" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto  " rows="2" required/>

                    {errors.alamat_domisili && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.alamat_domisili.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}

                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Kota Domisili <span className="text-red-500">*</span></label>
                    <input name="kota_domisili" onChange={handleChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto  " required/>

                    {errors.kota_domisili && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.kota_domisili.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                </div>

                <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Pendidikan Akhir <span className="text-red-500">*</span>
                </label>

                <select
                    name="pendidikan_akhir"
                    value={formData.pendidikan_akhir || ""}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                    <option value="">-- Pilih Pendidikan --</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                    <option value="S1">S1</option>
                    <option value="Lainnya">Lainnya</option>
                </select>

                    {errors.pendidikan_akhir && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.pendidikan_akhir.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Nama Sekolah / Universitas / MA</label>
                    <input onChange={handleChange} name="nama_sekolah" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto  "/>

                    {errors.nama_sekolah && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.nama_sekolah.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}

                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Pengalaman Kerja Terakhir</label>
                    <input onChange={handleChange} name="pengalaman_kerja_terakhir" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-auto  " />

                    {errors.pengalaman_kerja_terakhir && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.pengalaman_kerja_terakhir.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                    
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Apakah Anda pernah mengikuti pelatihan tukang di Habitat Indonesia dan DPN PERKASA?</label>
                    <div className="space-y-2">
                    <label className="flex items-center"><input onChange={handleChange} type="radio" name="pelatihan_habitat" value="Iya" className="mr-2"/> Iya</label>
                    <label className="flex items-center"><input onChange={handleChange} type="radio" name="pelatihan_habitat" value="Tidak" className="mr-2"/> Tidak</label>
                    </div>

                    {errors.pelatihan_habitat && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.pelatihan_habitat.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                    
                </div>


                <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Apakah Anda pernah mengikuti pelatihan tukang di lembaga lainnya?
                </label>

                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                        type="radio"
                        name="pelatihan_lain"
                        value="Iya"
                        className="mr-2"
                        onChange={handlePelatihanLainChange}
                        checked={formData.pelatihan_lain === "Iya"}
                        />
                        Iya
                    </label>


                    <label className="flex items-center">
                        <input
                        type="radio"
                        name="pelatihan_lain"
                        value="Tidak"
                        className="mr-2"
                        onChange={handlePelatihanLainChange}
                        checked={formData.pelatihan_lain === "Tidak"}
                        />
                        Tidak
                    </label>

                    {errors.pelatihan_lain && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                        {errors.pelatihan_lain.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                        ))}
                    </div>
                    )}
                    
                </div>

                {/* Tampilkan field tambahan hanya jika "Iya" dipilih */}
                {otherJob === true && (
                    <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Mohon sebutkan nama lembaga pelatihannya
                    </label>
                    <input onChange={handleChange}
                        type="text"
                        name="nama_lembaga_pelatihan"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Contoh: BLK, LPK, dll"
                    />

                    {errors.nama_lembaga_pelatihan && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                            {errors.nama_lembaga_pelatihan.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm">
                                {error}
                            </p>
                            ))}
                        </div>
                    )}

                    </div>
                    
                )}

                </div>

                <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                        <label className="flex items-start space-x-2">
                            <input
                            type="checkbox"
                            name="konfirmasi"
                            onChange={handleChange}
                            checked={formData.konfirmasi || false}
                            required
                            className="mt-1 mr-2"
                            />
                            <span className="text-sm text-gray-900">
                            Dengan mengisi form ini saya setuju dan memberikan izin untuk pengumpulan dan penggunaan data pribadi saya sesuai yang tercantum untuk keperluan event Job Fair Bidang Konstruksi.
                            </span>
                        </label>

                        {errors.konfirmasi && (
                            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                                {errors.konfirmasi.map((error, index) => (
                                <p key={index} className="text-red-500 text-sm">
                                    {error}
                                </p>
                                ))}
                            </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <label className="flex items-start space-x-2">
                            <input
                            type="checkbox"
                            name="konfirmasi_event"
                            onChange={handleChange}
                            checked={formData.konfirmasi_event || false}
                            required
                            className="mt-1 mr-2"
                            />
                            <span className="text-sm text-gray-900">
                            Saya setuju atas syarat dan ketentuan yang berlaku atas pendaftaran event.
                            </span>
                        </label>

                        {errors.konfirmasi_event && (
                            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mt-2">
                                {errors.konfirmasi_event.map((error, index) => (
                                <p key={index} className="text-red-500 text-sm">
                                    {error}
                                </p>
                                ))}
                            </div>
                            )}
                    </div>
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kirim</button>
                </form>
        </div>
    );
}

export default HabitatPage
