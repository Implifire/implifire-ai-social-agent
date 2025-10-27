export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-700 text-white p-8">
      <div className="max-w-4xl mx-auto text-center pt-20">
        <h1 className="text-6xl font-bold mb-4">IMPLIFIRE</h1>
        <p className="text-2xl mb-2">AI SOCIAL AGENT</p>
        <p className="text-lg mb-8">Upload → AI writes → Auto-posts to 6 platforms</p>
        <a href="/upload" className="bg-yellow-400 text-black px-8 py-4 rounded-full text-xl font-bold">
          Start Uploading
        </a>
      </div>
    </div>
  );
}
