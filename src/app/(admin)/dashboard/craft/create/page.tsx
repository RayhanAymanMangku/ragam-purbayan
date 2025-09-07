"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2, X } from "lucide-react"
import { deleteImage, uploadImage } from "@/lib/supabase"
import { Craft } from "@/components/featured/dashboard/types/Craft"
import { createCraft } from "@/components/featured/dashboard/services/craft.service"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { craftTypeOptions } from "@/components/featured/dashboard/lib/constants"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const AssetsCreatePage = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    type: [] as string[],
    owner: "",
    email: "",
    phone: "",
    description: "",
    maps: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => {
      const newTypes = prev.type.includes(value)
        ? prev.type.filter((t) => t !== value) // Remove if already selected
        : [...prev.type, value]; // Add if not selected
      return { ...prev, type: newTypes };
    });
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + selectedImages.length > 4) {
      alert("Maximum 4 images allowed")
      return
    }
    const newImages = [...selectedImages, ...files].slice(0, 4)
    setSelectedImages(newImages)
    const newPreviews = newImages.map((file) => URL.createObjectURL(file))
    setImagePreviews(newPreviews)
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index])
    setSelectedImages(newImages => newImages.filter((_, i) => i !== index))
    setImagePreviews(newPreviews => newPreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const requiredFields: (keyof Omit<typeof formData, 'type' | 'email'>)[] = ['name', 'owner', 'phone', 'description', 'maps'];
    const missingField = requiredFields.find(field => !formData[field]);

    if (missingField) {
      setError(`Kolom "${missingField}" wajib diisi.`);
      return;
    }

    if (selectedImages.length === 0) {
      setError("Harap unggah setidaknya satu gambar.");
      return;
    }

    setIsLoading(true);
    let imageUrls: string[] = [];

    try {
      imageUrls = await Promise.all(
        selectedImages.map(file => uploadImage(file))
      );

      const craftData: Craft = {
        ...formData,
        slug: '',
        images: imageUrls,
      };

      await createCraft(craftData);

      alert("Kerajinan berhasil dibuat!");
      router.push("/dashboard");

    } catch (err) {
      console.error("Submission failed:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");

      if (imageUrls.length > 0) {
        console.log("Gagal menyimpan ke database. Menghapus gambar yang sudah diunggah...");
        try {
          await Promise.all(imageUrls.map(url => deleteImage(url)));
          console.log("Cleanup berhasil.");
        } catch (cleanupError) {
          console.error("Gagal menghapus gambar:", cleanupError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTypeLabels = craftTypeOptions
    .filter(option => formData.type.includes(option.value))
    .map(option => option.label)
    .join(', ');

  return (
    <div className="container max-w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-sm border ">
        {/* Nama Kerajinan */}
        <div>
          <Label htmlFor="name">Craft Name <span className="text-red-500">*</span></Label>
          <Input id="name" name="name" required placeholder="Craft Name" onChange={handleInputChange} />
        </div>
        {/* Tipe Kerajinan */}
        <div>
          <Label htmlFor="type">Craft Type <span className="text-red-500">*</span></Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                {selectedTypeLabels || "Select asset types"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuLabel>Craft Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {craftTypeOptions.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.value}
                  checked={formData.type.includes(type.value)}
                  onCheckedChange={() => handleTypeChange(type.value)}
                  onSelect={(e) => e.preventDefault()} // Prevents menu from closing on select
                >
                  {type.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Email */}
        <div>
          <Label htmlFor="email">Email Service</Label>
          <Input id="email" type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        </div>
        {/* Telepon */}
        <div>
          <Label htmlFor="phone">Phone Service <span className="text-red-500">*</span></Label>
          <Input id="phone" required type="text" name="phone" placeholder="+62" onChange={handleInputChange} />
        </div>
        {/* Deskripsi */}
        <div>
          <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
          <Textarea id="description" required name="description" placeholder="Product Description" onChange={handleInputChange} />
        </div>
        {/* Nama Pemilik */}
        <div>
          <Label htmlFor="owner">Owner Name <span className="text-red-500">*</span></Label>
          <Input id="owner" type="text" name="owner" required placeholder="Name" onChange={handleInputChange} />
        </div>
        {/* Peta */}
        <div>
          <Label htmlFor="maps">Link Maps (Google Maps) <span className="text-red-500">*</span></Label>
          <Input id="maps" name="maps" type="text" placeholder="https://..." onChange={handleInputChange} />
        </div>
        {/* Gambar */}
        <div>
          <Label htmlFor="image">Images ({selectedImages.length}/4 Required) <span className="text-red-500">*</span></Label>
          <Input id="image" type="file" multiple accept="image/*" onChange={handleImageChange} />
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <Image src={preview || "/placeholder.svg"} alt={`Preview ${index + 1}`} width={300} height={128} className="w-full h-32 object-cover rounded-sm border" />
                  <Button variant="destructive" size="icon" onClick={() => removeImage(index)} className="absolute top-2 right-2 rounded-full flex text-center">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Tombol Submit */}
        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-sm">{error}</p>}
        {/* PERBAIKAN: Tombol dinonaktifkan jika tidak ada gambar atau sedang loading */}
        <Button type="submit" disabled={isLoading || selectedImages.length === 0} className="bg-orange-500 text-white hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : "Upload Craft"}
        </Button>
      </form>
    </div>
  )
}

export default AssetsCreatePage