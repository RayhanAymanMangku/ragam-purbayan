import { createClient } from '@supabase/supabase-js';

// Pastikan variabel environment Anda sudah di-setup dengan benar
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Mengunggah satu file ke Supabase Storage dan mengembalikan URL publiknya.
 * @param file - Objek File yang akan diunggah.
 * @returns Promise yang resolve dengan URL publik dari gambar.
 */
export const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    
    // PERBAIKAN: Tambahkan string acak untuk memastikan nama file selalu unik
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `${Date.now()}-${randomString}.${fileExt}`;
    
    const filePath = `public/vendor/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("ragam-purbayan")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (uploadError) {
        console.error("Supabase Upload Error:", uploadError);
        throw new Error("Gagal mengunggah gambar.");
    }

    const { data } = supabase.storage
        .from("ragam-purbayan")
        .getPublicUrl(filePath);

    if (!data.publicUrl) {
        throw new Error("Gagal mendapatkan URL publik gambar.");
    }

    return data.publicUrl;
};

/**
 * Menghapus gambar dari Supabase Storage berdasarkan URL publiknya.
 * @param publicUrl - URL publik lengkap dari file yang akan dihapus.
 */
export const deleteImage = async (publicUrl: string) => {
    const bucketName = "ragam-purbayan";
    const filePath = publicUrl.split(`/${bucketName}/`)[1];

    if (!filePath) {
        console.error("URL tidak valid untuk dihapus:", publicUrl);
        return;
    }

    const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);
    
    if (error) {
        console.error("Gagal menghapus gambar:", error.message);
    }
};