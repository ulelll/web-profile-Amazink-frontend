import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Upload, X } from "lucide-react";
import { useState } from "react";

export default function UploadImageComponent({ disabled, onChange }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (onChange) onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileClick = () => {
    setShowDialog(true);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (onChange) onChange(null);
    setShowDialog(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      {/* Profile Image Preview */}
      <div className="inline-flex items-center ">
        <div className="relative group">
          {/* Image Container - Clickable */}
          <button
            disabled={disabled}
            onClick={handleProfileClick}
            className="w-80 h-64 rounded-xl overflow-hidden bg-gray-200 border-4 border-white shadow-lg relative focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                <Camera className="w-16 h-16 text-gray-500" />
              </div>
            )}

            {/* Overlay on hover */}
            <div
              className={
                "absolute inset-0 bg-black bg-opacity-40 transition-opacity flex items-center justify-center " +
                (disabled ? "opacity-0" : "opacity-0 group-hover:opacity-100")
              }
            >
              <div className="text-white text-center">
                <Camera className="w-8 h-8 mx-auto mb-1" />
                <span className="text-xs font-medium">Click to edit</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Dialog Modal */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Profile Picture</DialogTitle>
            <DialogDescription>
              Preview and manage your profile picture.
            </DialogDescription>
          </DialogHeader>

          {/* Large Image Preview */}
          {imagePreview ? (
            <div className="mb-6">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="mb-6 w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
              <Camera className="w-20 h-20 text-gray-400" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Upload / Change */}
            <label
              htmlFor="profile-upload"
              className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors font-medium"
            >
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                <span>{imagePreview ? "Change Photo" : "Upload Photo"}</span>
              </div>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Remove Photo */}
            {imagePreview && (
              <button
                onClick={handleRemoveImage}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                <span>Remove Photo</span>
              </button>
            )}

            {/* Cancel */}
            <DialogClose
              onClick={handleCloseDialog}
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
            >
              Close
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
