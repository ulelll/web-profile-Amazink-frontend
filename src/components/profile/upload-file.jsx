import { FileText, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui';

export default function UploadFileComponent({ disabled }) {
    const [pdf, setPdf] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            console.warn("Bro… pick a PDF.");
            return;
        }

        setPdf(file);
        setPreviewUrl(URL.createObjectURL(file));
    }
    const handleRemove = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPdf(null);
        setPreviewUrl(null);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };
    return (
        <div>
            {/* Profile Image Preview */}

            <div className="relative group">
                {!previewUrl ? (
                    <div className="bg-white rounded-lg ">
                        <label
                            htmlFor="pdf-upload"
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all duration-300 ${disabled ? "pointer-events-none opacity-100" : ""}`} >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileText className="w-16 h-16 text-red-400 mb-4" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    PDF files only (up to 10MB)
                                </p>
                            </div>
                            <Input
                                disabled={disabled}
                                id="pdf-upload"
                                type="file"
                                className="hidden"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>) : (
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">PDF Preview</h2>
                            <button
                                onClick={handleRemove}
                                className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                                title="Remove PDF"
                            >
                                <X className="w-5 h-5 text-red-500" />
                            </button>
                        </div>

                        {/* File Info */}
                        <div className="mb-6 p-4 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-red-500" />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 truncate">{pdf.name}</p>
                                    <p className="text-sm text-gray-500">{formatFileSize(pdf.size)}</p>
                                </div>
                            </div>
                        </div>

                        {/* PDF Preview */}
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                            <iframe
                                src={previewUrl}
                                className="w-full h-[400px]"
                                title="PDF Preview"
                            />
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={handleRemove}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                            >
                                Remove PDF
                            </button>
                            <button
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                            >
                                Upload PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >


    );
}