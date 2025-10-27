'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  const handleUpload = async () => {
    if (files.length < 3) {
      alert('Upload at least 3 photos!');
      return;
    }
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from('media')
        .upload(`public/${Date.now()}-${file.name}`, file);
      if (error) {
        console.error(error);
        continue;
      }
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path);
      urls.push(publicUrl);
    }
    setMediaUrls(urls);
    setUploading(false);
    alert(`${urls.length} files uploaded! AI captions coming...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-600 to-pink-700 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12">
          <h1 className="text-5xl font-black text-white mb-4 text-center">IMPLIFIRE UPLOAD</h1>
          <p className="text-xl text-white/90 mb-8 text-center">Upload 3+ photos. AI generates captions & schedules posts.</p>
          
          <div className="bg-white/20 rounded-2xl p-8 mb-8 border-2 border-white/30">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="block w-full text-lg text-white file:mr-6 file:py-4 file:px-8 file:rounded-full file:border-0 file:text-lg file:font-bold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300 cursor-pointer"
            />
            <p className="mt-4 text-white text-lg">Selected: <span className="font-bold">{files.length}</span> files</p>
          </div>
          
          <button
            onClick={handleUpload}
            disabled={uploading || files.length < 3}
            className="w-full bg-yellow-400 text-black py-5 rounded-full text-2xl font-bold shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading & Analyzing...' : 'Upload & Generate AI Captions'}
          </button>

          {mediaUrls.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Uploaded Media</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {mediaUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`Media ${i}`} className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-200" />
                    <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <p className="text-white font-bold">AI Caption Ready</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
