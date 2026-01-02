import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    } from "@/components/ui/dialog";
    import { Camera, Upload, X } from "lucide-react";
    import { useState } from "react";

    export default function ProfileImageUpload({
    disabled,
    imgUrl,
    onChange, 
    }) {
    const [imagePreview, setImagePreview] = useState(imgUrl || null);
    const [showDialog, setShowDialog] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file || !file.type.startsWith("image/")) return;
        onChange(file);

        const reader = new FileReader();
        reader.onloadend = () => {
        setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        onChange(null); 
        setShowDialog(false);
    };

    return (
        <div>
        {/* Avatar */}
        <button
            type="button"
            disabled={disabled}
            onClick={() => setShowDialog(true)}
            className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg relative"
        >
            {imagePreview ? (
            <img
                src={imagePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-500" />
            </div>
            )}
        </button>

        {/* Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload Foto Profile</DialogTitle>
                <DialogDescription>
                Pilih foto untuk digunakan sebagai foto profile.
                </DialogDescription>
            </DialogHeader>

            {imagePreview && (
                <img
                src={imagePreview}
                className="w-full h-64 object-cover rounded-lg mb-4"
                />
            )}

            <label className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg cursor-pointer">
                <Upload className="inline w-5 h-5 mr-2" />
                Upload Photo
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                />
            </label>

            {imagePreview && (
                <button
                onClick={handleRemoveImage}
                className="w-full bg-red-500 text-white py-3 rounded-lg mt-3"
                >
                <X className="inline w-5 h-5 mr-2" />
                Remove Photo
                </button>
            )}

            <DialogClose className="w-full mt-3 py-3 bg-gray-200 rounded-lg">
                Close
            </DialogClose>
            </DialogContent>
        </Dialog>
        </div>
    );
}
