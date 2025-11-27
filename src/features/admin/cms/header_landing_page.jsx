import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Eye, EyeOff, Trash2, Pencil } from 'lucide-react';
import AdminLayout from '@/layouts/Admin_Layout';

export default function HeaderLandingPage() {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [entries, setEntries] = useState([
        { id: 1, image: '/api/placeholder/400/300', text: 'Welcome to our amazing platform', visible: true },
        { id: 2, image: '/api/placeholder/400/300', text: 'Discover new features every day', visible: true },
        { id: 4, image: '/api/placeholder/400/300', text: 'Join our community today', visible: false },
        { id: 5, image: '/api/placeholder/400/300', text: 'Join our community today', visible: true },
        { id: 6, image: '/api/placeholder/400/300', text: 'Join our community today', visible: false },
        { id: 7, image: '/api/placeholder/400/300', text: 'Join our community today', visible: true },
    ]);

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
        if (image || text) {
        const newEntry = {
            id: entries.length + 1,
            image: image || '/api/placeholder/400/300',
            text: text || 'Lorem ipsum dolor sit amet',
            visible: true
        };
        setEntries([...entries, newEntry]);
        setImage(null);
        setText('');
        }
    };

    const toggleVisibility = (id) => {
        setEntries(entries.map(entry => 
        entry.id === id ? { ...entry, visible: !entry.visible } : entry
        ));
    };

    const deleteEntry = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    return ( 
        <AdminLayout>
            <div className="min-h-screen bg-gray-50">

            {/* Main Content */}
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Custom Landing Page Header Image</h1>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Upload Image Section */}
                    <Card>
                        <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Upload your image</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            {image ? (
                            <img src={image} alt="Preview" className="max-h-48 mx-auto mb-4 rounded" />
                            ) : (
                            <div className="flex flex-col items-center justify-center py-8">
                                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                <p className="text-gray-500 mb-4">drag & drop your image</p>
                            </div>
                            )}
                            <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            />
                            <Button
                            onClick={() => document.getElementById('fileInput').click()}
                            className="bg-blue-600 hover:bg-blue-700"
                            >
                            Browse file
                            </Button>
                        </div>
                        </CardContent>
                    </Card>

                    {/* Add Text Section */}
                    <Card>
                        <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Add a little bit of text</h2>
                        <Textarea
                            placeholder="Your text here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="min-h-[200px] mb-2 resize-none"
                            maxLength={100}
                        />
                        <p className="text-right text-sm text-gray-500 mb-4">{text.length}/100</p>
                        <Button 
                            onClick={handleSave}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                        >
                            Save
                        </Button>
                        </CardContent>
                    </Card>
                    </div>


                    {/* Table Section */}
                    <Card>
                    <CardContent className="p-6">
                        <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700 w-20">No</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700 w-32">Image</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Text</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700 w-40">Visibility</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700 w-32">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {entries.map((entry, index) => (
                                <tr key={entry.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4 font-medium">{index + 1}</td>
                                <td className="py-4 px-4">
                                    <img 
                                    src={entry.image} 
                                    alt={`Entry ${entry.id}`}
                                    className="w-20 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-4 px-4">
                                    <p className="max-w-md">{entry.text}</p>
                                </td>
                                <td className="py-4 px-4">
                                    <Button
                                    variant={entry.visible ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleVisibility(entry.id)}
                                    className={entry.visible ? "bg-gray-900 hover:bg-gray-800" : ""}
                                    >
                                    {entry.visible ? (
                                        <>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Show
                                        </>
                                    ) : (
                                        <>
                                        <EyeOff className="w-4 h-4 mr-2" />
                                        Hidden
                                        </>
                                    )}
                                    </Button>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {/* Edit logic */}}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteEntry(entry.id)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    </div>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}