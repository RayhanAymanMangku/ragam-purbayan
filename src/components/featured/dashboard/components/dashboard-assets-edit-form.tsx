"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { Loader2, X } from "lucide-react"
import { deleteImage, uploadImage } from "@/lib/supabase"
import { CraftWithoutSlug } from "@/components/featured/dashboard/types/Craft"
import { updateCraft } from "@/components/featured/dashboard/services/craft.service" 
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { craftTypeOptions } from "@/components/featured/dashboard/lib/constants"

// Tentukan tipe props yang diterima komponen ini
interface AssetsEditFormProps {
  initialData: CraftWithoutSlug;
}

const DashboardAssetsEditForm = ({ initialData }: AssetsEditFormProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]); 
  const [formData, setFormData] = useState({
    id: initialData.id,
    name: "",
    type: "",
    owner: "",
    email: "",
    phone: "",
    description: "",
    maps: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // useEffect untuk mengisi form dengan data awal saat komponen dimuat
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || "",
        type: initialData.type || "",
        owner: initialData.owner || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        description: initialData.description || "",
        maps: initialData.maps || "",
      });
      // Pastikan images juga memiliki fallback jika kosong
      setExistingImageUrls(initialData.images || []);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + selectedImages.length + existingImageUrls.length > 4) {
      alert("Maksimal 4 gambar yang diizinkan")
      return
    }
    const newImages = [...selectedImages, ...files].slice(0, 4 - existingImageUrls.length)
    setSelectedImages(newImages)
    
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    const newPreviews = newImages.map((file) => URL.createObjectURL(file))
    setImagePreviews(newPreviews)
  }

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index])
    setSelectedImages(current => current.filter((_, i) => i !== index))
    setImagePreviews(current => current.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    setExistingImageUrls(current => current.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const requiredFields: (keyof typeof formData)[] = ['name', 'type', 'owner', 'phone', 'description', 'maps'];
    if (requiredFields.some(field => !formData[field])) {
      setError("Harap isi semua kolom yang wajib diisi.");
      return;
    }

    if (selectedImages.length + existingImageUrls.length === 0) {
      setError("Harap unggah setidaknya satu gambar.");
      return;
    }

    setIsSubmitting(true);
    let newImageUrls: string[] = [];

    try {
      if (selectedImages.length > 0) {
        newImageUrls = await Promise.all(
          selectedImages.map(file => uploadImage(file))
        );
      }

      const finalImageUrls = [...existingImageUrls, ...newImageUrls];

      const craftData = {
        ...formData,
        images: finalImageUrls,
      };

      await updateCraft(initialData.id, craftData);

      alert("Kerajinan berhasil diperbarui!");
      router.push("/dashboard");

    } catch (err) {
      console.error("Submission failed:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");
      if (newImageUrls.length > 0) {
        await Promise.all(newImageUrls.map(url => deleteImage(url)));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-sm border ">
        {/* Nama Kerajinan */}
        <div>
          <Label htmlFor="name">Craft Name <span className="text-red-500">*</span></Label>
          <Input id="name" name="name" required value={formData.name} placeholder="Craft Name" onChange={handleInputChange} />
        </div>
        {/* Tipe Kerajinan */}
        <div>
          <Label htmlFor="type">Craft Type <span className="text-red-500">*</span></Label>
          <Select name="type" value={formData.type} onValueChange={handleSelectChange} required>
            <SelectTrigger><SelectValue placeholder="Select an asset type" /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Craft Types</SelectLabel>
                {craftTypeOptions.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Email */}
        <div>
          <Label htmlFor="email">Email Service</Label>
          <Input id="email" type="email" name="email" value={formData.email} placeholder="Email" onChange={handleInputChange} />
        </div>
        {/* Telepon */}
        <div>
          <Label htmlFor="phone">Phone Service <span className="text-red-500">*</span></Label>
          <Input id="phone" required type="text" name="phone" value={formData.phone} placeholder="+62" onChange={handleInputChange} />
        </div>
        {/* Deskripsi */}
        <div>
          <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
          <Textarea id="description" required name="description" value={formData.description} placeholder="Product Description" onChange={handleInputChange} />
        </div>
        {/* Nama Pemilik */}
        <div>
          <Label htmlFor="owner">Owner Name <span className="text-red-500">*</span></Label>
          <Input id="owner" type="text" name="owner" required value={formData.owner} placeholder="Name" onChange={handleInputChange} />
        </div>
        {/* Peta */}
        <div>
          <Label htmlFor="maps">Link Maps (Google Maps) <span className="text-red-500">*</span></Label>
          <Input id="maps" name="maps" type="text" value={formData.maps} placeholder="https://..." onChange={handleInputChange} />
        </div>
        {/* Gambar */}
        <div>
          <Label htmlFor="image">Images ({existingImageUrls.length + selectedImages.length}/4 Required) <span className="text-red-500">*</span></Label>
          <Input id="image" type="file" multiple accept="image/*" onChange={handleImageChange} disabled={existingImageUrls.length + selectedImages.length >= 4} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {existingImageUrls.map((url, index) => (
              <div key={url} className="relative group">
                <Image src={url} alt={`Existing Image ${index + 1}`} width={300} height={128} className="w-full h-32 object-cover rounded-sm border" />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeExistingImage(index)} className="absolute top-2 right-2 rounded-full flex text-center">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {imagePreviews.map((preview, index) => (
              <div key={preview} className="relative group">
                <Image src={preview} alt={`New Preview ${index + 1}`} width={300} height={128} className="w-full h-32 object-cover rounded-sm border" />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeNewImage(index)} className="absolute top-2 right-2 rounded-full flex text-center">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Tombol Submit */}
        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-sm">{error}</p>}
        <Button type="submit" disabled={isSubmitting || (existingImageUrls.length + selectedImages.length === 0)} className="bg-orange-500 text-white hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Update Craft"}
        </Button>
      </form>
    </div>
  )
}

export default DashboardAssetsEditForm
