import img from '@/assets/poce.jpg';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function NewsDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [category, setCategory] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const dummyArticle = [{
            id: 1,
            image: img,
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2,
            image: '/news/foto1.jpg',
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }, {
            id: 3,
            image: '/news/foto1.jpg',
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }, {
            id: 4,
            image: '/news/foto1.jpg',
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },]

        const found = dummyArticle.find(item => item.id === Number(id));

        if (found) {
            const [cat, t] = found.description.split(' • ');
            setCategory(cat);
            setTime(t);
            setArticle(found);
        }
    }, [id]);
    console.log('con', article);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Artikel tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                    ← Kembali
                </button>
                <Card className="border-0 shadow-none">
                    <CardHeader className="space-y-6">
                        <div className="space-y-4">
                            <Label className="text-sm text-gray-500 font-medium">
                                {category}
                            </Label>
                            <CardTitle className="text-4xl font-serif leading-tight">
                                {article.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                                {time}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 justify-center items-center flex flex-col">
                        <div className="max-w-4xl h-96 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {article.content}
                            </p>
                        </div>
                    </CardContent>
                </Card>


            </div>
        </div>
    );
}