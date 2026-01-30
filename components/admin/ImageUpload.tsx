
import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = "Şəkil Yüklə" }) => {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Yükləmə uğursuz oldu');

            const data = await response.json();
            onChange(data.url);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Şəkil yüklənərkən xəta baş verdi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase">{label}</label>
            <div className="flex items-start gap-4">
                <div className="relative group">
                    <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden flex items-center justify-center transition-colors group-hover:border-accent">
                        {value ? (
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon className="h-8 w-8 text-slate-300" />
                        )}

                        {loading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                                <Loader2 className="h-6 w-6 text-accent animate-spin" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                        Tövsiyə olunan ölçü: 1200x800px. JPG, PNG və ya WebP formatları dəstəklənir.
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <Upload className="h-3.5 w-3.5" /> Seç və Yüklə
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange('')}
                                className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-all flex items-center gap-2"
                            >
                                <X className="h-3.5 w-3.5" /> Sil
                            </button>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
