import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImagePlus } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminLayout from '@/layouts/Admin_Layout';

export default function NewsUploadPage() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');

    const modules = {
        toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['clean']
        ]
    };

    const formats = [
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align'
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        console.log('Saving draft...', { title, image, content });
        // Add your save logic here
    };

    const handleUpload = () => {
        console.log('Uploading news...', { title, image, content });
        // Add your upload logic here
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">upload news</h1>
                    
                    <Card>
                    <CardContent className="p-8">
                        {/* Title Input */}
                        <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tambahkan judul
                        </label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                            placeholder="Enter title..."
                        />
                        </div>

                        {/* Image Upload */}
                        <div className="mb-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            {image ? (
                            <div className="relative">
                                <img 
                                src={image} 
                                alt="Preview" 
                                className="max-h-64 mx-auto rounded"
                                />
                                <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setImage(null)}
                                className="mt-4"
                                >
                                Remove Image
                                </Button>
                            </div>
                            ) : (
                            <div className="text-center">
                                <Button
                                variant="outline"
                                onClick={() => document.getElementById('newsImageInput').click()}
                                className="flex items-center gap-2"
                                >
                                <ImagePlus className="w-5 h-5" />
                                Tambah Gambar
                                </Button>
                            </div>
                            )}
                            <input
                            type="file"
                            id="newsImageInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            />
                        </div>
                        </div>

                        {/* Rich Text Editor */}
                        <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Masukan Judul
                        </label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                            placeholder="Tulis konten berita di sini..."
                            className="bg-white"
                            style={{ height: '300px', marginBottom: '50px' }}
                        />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                        <Button
                            variant="outline"
                            onClick={handleSave}
                            className="px-8"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={handleUpload}
                            className="px-8 bg-blue-600 hover:bg-blue-700"
                        >
                            Upload
                        </Button>
                        </div>
                    </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}