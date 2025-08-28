import MainContent from "@/components/featured/profile/components/main-content"

import HeroImage from "@/components/featured/home/components/hero-image"

const page = () => {
    return (
        <div className="flex-col gap-6">
            <HeroImage
                title="Profil Kelurahan Purbayan"
                src="/assets/purbayan-profile.jpg"
            />
             <MainContent
                description="Kelurahan Purbayan  dibentuk pada tahun 1981, berdasar Peraturan Daerah Propinsi Daerah Istimewa Yogyakarta ( Perda DIY) Nomor 6 tahun 1981 Tentang Pembentukan, Pemecahan, Penyatuan dan Penghapusan Kelurahan di Propinsi Daerah Istimewa Yogyakarta. Kelurahan Purbayan terbentuk dari 4 eks Rukun Kampung (RK) yaitu : RK Gedongan, RK Basen, RK Purbayan, dan RK Alun – Alun. Dengan pembentukan Kelurahan, 4 RK digabung dan dibagi menjadi 14 Rukun Warga (RW) dan terdiri dari 58 Rukun Tetangga (RT) dengan jumlah Kepala Keluarga 3302 KK dan jumlah penduduk 10.176 jiwa."
                imgSrc="/assets/logo-pemkot.png"
                geography="Ketinggian Wilayah Kelurahan Purbayan secara umum terletak pada posisi 113 m di atas permukaan laut. Kelurahan Purbayan terletak di wilayah Kecamatan Kotagede Kota Yogyakarta yang merupakan kota tua bekas Ibu kota kerajaan, Kota Kotagede merupakan kota warisan (heritage) yang amat berpotensi bagi kemakmuran masyarakatnya dan merupakan daerah hunian padat. Walaupun di Kelurahan Purbayan relatif tidak ada industri besar, namun kegiatan ekonomi bergerak cukup tinggi terutama karena digerakkan oleh kerajinan industri perak (silver) yang berada di dan sekitar Kelurahan Purbayan."
            />
        </div>
    )
}

export default page