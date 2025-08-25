"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
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
import { Craft } from "@/components/featured/dashboard/types/Craft"
import { createCraft } from "@/components/featured/dashboard/services/craft.service"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { craftTypeOptions } from "@/components/featured/dashboard/lib/constants"

const AssetsCreatePage = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    owner: "",
    email: "",
    phone: "",
    description: "",
    maps: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handler untuk komponen Select
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (files.length + selectedImages.length > 5) {
      alert("Maximum 5 images allowed")
      return
    }

    const newImages = [...selectedImages, ...files].slice(0, 5)
    setSelectedImages(newImages)

    // Create preview URLs
    const newPreviews = newImages.map((file) => URL.createObjectURL(file))
    setImagePreviews(newPreviews)
  }

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index])

    setSelectedImages(newImages)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      setError("Harap unggah setidaknya satu gambar.");
      return;
    }
    if (selectedImages.length > 5) {
      setError("Anda hanya dapat mengunggah maksimal 5 gambar.");
      return;
    }

    setIsLoading(true);
    setError(null);

    let imageUrls: string[] = [];


    try {
      // 1. Unggah semua gambar yang dipilih ke Supabase secara paralel
      imageUrls = await Promise.all(
        selectedImages.map(file => uploadImage(file))
      );

      // 2. Siapkan data lengkap untuk dikirim ke server action
      const craftData: Craft = {
        ...formData,
        slug: '',
        images: imageUrls,
      };

      // 3. Panggil server action untuk menyimpan data ke database
      await createCraft(craftData);

      // 4. Proses berhasil
      alert("Kerajinan berhasil dibuat!");
      router.push("/dashboard"); // Arahkan ke halaman lain setelah berhasil

    } catch (err) {
      console.error("Submission failed:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");
      if (imageUrls.length > 0) {
        console.log("Submission to database failed. Deleting uploaded images...");
        try {
          await Promise.all(imageUrls.map(url => deleteImage(url)));
          console.log("Cleanup successful. Orphaned images deleted.");
        } catch (cleanupError) {
          console.error("Failed to delete orphaned images:", cleanupError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-sm border ">
        <div>
          <Label htmlFor="name">
            Craft Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Craft Name"
            className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="type">
            Craft Type <span className="text-red-500">*</span>
          </Label>
          <Select name="type" onValueChange={handleSelectChange} required>
            <SelectTrigger className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm w-full">
              <SelectValue placeholder="Select an asset type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Craft Types</SelectLabel>
                {craftTypeOptions.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="email">Email Service</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="phone">
            Phone Service <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            required
            type="text"
            name="phone"
            placeholder="+62"
            className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            required
            name="description"
            placeholder="Product Description"
            className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm"

          />
        </div>
        <div>
          <Label htmlFor="owner">
            Owner Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="owner"
            type="text"
            name="owner"
            required
            placeholder="Name"
            className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="maps">
            Link Maps (Google Maps) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="maps"
            name="maps"
            type="text"
            placeholder="https://..."
            className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="image">
            Images ({selectedImages.length}/5 Required) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="image"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm"
          />

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    width={300}
                    height={128}
                    className="w-full h-32 object-cover rounded-sm border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2  rounded-full flex text-center transition-colors hover:bg-destructive/40 duration-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {selectedImages.length < 5 && (
            <p className="text-sm text-gray-500 mt-2">
              Please select {5 - selectedImages.length} more image{5 - selectedImages.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-sm">{error}</p>}
        <Button type="submit" disabled={isLoading || selectedImages.length === 0} className="bg-orange-500 text-white hover:bg-orange-700 transition-all duration-300 rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed">
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : "Upload Craft"}
        </Button>
        <p className="text-gray-500 text-sm">* indicates required fields</p>
      </form>
    </div>
  )

}

export default AssetsCreatePage
