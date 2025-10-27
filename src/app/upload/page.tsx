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
    alert(`${urls.length} files uploaded!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-700 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">IMPLIFIRE – Upload Media</h1>
        <p className="mb-4">Upload 3+ photos. AI will generate captions.</p>
        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="mb-4 block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
        />
        <p className="mb-4">Selected: {files.length} files</p>
        
        <button
          onClick={handleUpload}
          disabled={uploading || files.length < 3}
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold disabled:opacity-50 hover:bg-yellow-300"
        >
          {uploading ? 'Uploading...' : 'Upload & Analyze'}
        </button>

        {mediaUrls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Uploaded:</h2>
            <div className="grid grid-cols-3 gap-4">
              {mediaUrls.map((url, i) => (
                <img key={i} src={url} alt={`Media ${i}`} className="w-full h-40 object-cover rounded" />
              ))}
            famous
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
