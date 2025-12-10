import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function VacancyCard({ vacancy }) {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <div className="relative overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 h-48">
                <img
                    src={vacancy.gambar}
                    alt={vacancy.judul_lowongan}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
            </div>
            <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
                    {vacancy.judul_lowongan}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                    <span
                        className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                            vacancy.active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        )}
                    >
                        {vacancy.active ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};