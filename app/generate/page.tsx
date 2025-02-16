"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { usePromptContext } from "@/context/PromptContext";
import { CustomCloudinaryUploadWidgetInfo } from "@/types";

export default function Generate() {
  const router = useRouter();
  const { prompt, setPrompt, uploadedImages, setUploadedImages } = usePromptContext();
  const imageFormats = ["png", "jpg", "jpeg"];
  const uploadPreset = "ml_default";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert("Please provide a prompt...");
      return;
    }

    router.push(`/editor`); // Navigate to the editor page
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            HTML Email Template Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prompt Input */}
            <Textarea
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={4}
            />

            {/* Cloudinary Upload Widget */}
            <div>
              <CldUploadWidget
                uploadPreset={uploadPreset}
                options={{
                  clientAllowedFormats: imageFormats, // Allow only PNG and JPG formats
                }}
                onSuccess={(result) => {
                  const uploadedImageInfo = result?.info as CustomCloudinaryUploadWidgetInfo;
                  if (uploadedImageInfo) {
                    setUploadedImages((prevImages) => [
                      ...prevImages,
                      uploadedImageInfo,
                    ]);
                  }
                }}
              >
                {({ open }) => (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                    onClick={() => open()}
                  >
                    Upload Images
                  </Button>
                )}
              </CldUploadWidget>
            </div>

            {/* Display Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image.secure_url}
                      alt={`Uploaded image ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover rounded-lg shadow-sm w-full h-24"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteImage(index)}
                      aria-label="Delete image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Generate
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
