import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/Admin_Layout'

export default function CustomVisiMisiPage() {
    const [visiText, setVisiText] = useState('');
    const [misiItems, setMisiItems] = useState(['', '', '', '']);

    const handleMisiChange = (index, value) => {
        const newMisiItems = [...misiItems];
        newMisiItems[index] = value;
        setMisiItems(newMisiItems);
    };

    const handleSaveVisi = () => {
        console.log('Saving visi...', visiText);
        // Add your save logic here
    };

    const handleSaveMisi = (index) => {
        console.log(`Saving misi ${index + 1}...`, misiItems[index]);
        // Add your save logic here
    };

    return (
    <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Custom visi-misi</h1>
            
            {/* Create New Visi Section */}
            <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">create new visi</h2>
            <Card>
                <CardContent className="p-6">
                <Textarea
                    value={visiText}
                    onChange={(e) => setVisiText(e.target.value)}
                    placeholder=""
                    className="min-h-[120px] mb-4 resize-none"
                />
                <div className="flex justify-end">
                    <Button 
                    onClick={handleSaveVisi}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    >
                    Save
                    </Button>
                </div>
                </CardContent>
            </Card>
            </div>

            {/* Create New Misi Section */}
            <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">create new misi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {misiItems.map((item, index) => (
                <Card key={index}>
                    <CardContent className="p-6">
                    <Textarea
                        value={item}
                        onChange={(e) => handleMisiChange(index, e.target.value)}
                        placeholder=""
                        className="min-h-[100px] mb-4 resize-none"
                    />
                    <div className="flex justify-end">
                        <Button 
                        onClick={() => handleSaveMisi(index)}
                        className="bg-blue-600 hover:bg-blue-700 px-8"
                        >
                        Save
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            </div>
        </div>
        </div>
        </AdminLayout>
    );
    
}