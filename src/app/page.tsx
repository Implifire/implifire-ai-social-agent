export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-600 to-pink-700 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-7xl font-black mb-4 tracking-tight">IMPLIFIRE</h1>
        <p className="text-3xl font-bold mb-2">AI SOCIAL AGENT</p>
        <p className="text-xl mb-10 opacity-90">Upload → AI writes → Auto-posts to 6 platforms</p>
        <a 
          href="/upload" 
          className="inline-block bg-yellow-400 text-black px-10 py-5 rounded-full text-2xl font-bold shadow-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200"
        >
          $50 Lifetime Beta (10 spots)
        </a>
        <p className="mt-6 text-sm opacity-70">Local businesses only</p>
      </div>
    </div>
  );
}
