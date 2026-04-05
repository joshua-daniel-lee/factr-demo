'use client';

export default function FlywheelDiagram() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Diagram Container */}
      <div className="relative aspect-square max-w-2xl mx-auto mb-12">
        {/* Rotating Outer Ring */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="relative w-full h-full">
            {/* Better Yield - Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-center px-4 hover:scale-110 transition-transform">
              <div>
                <div className="text-lg">Better Yield</div>
                <div className="text-xs opacity-90">For Publishers</div>
              </div>
            </div>

            {/* More Content - Right */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-center px-4 hover:scale-110 transition-transform">
              <div>
                <div className="text-lg">More Content</div>
                <div className="text-xs opacity-90">Available</div>
              </div>
            </div>

            {/* More Users - Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-center px-4 hover:scale-110 transition-transform">
              <div>
                <div className="text-lg">More Users</div>
                <div className="text-xs opacity-90">Engaged</div>
              </div>
            </div>

            {/* More Data - Left */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-center px-4 hover:scale-110 transition-transform">
              <div>
                <div className="text-lg">More Data</div>
                <div className="text-xs opacity-90">Insights</div>
              </div>
            </div>

            {/* Arrows - Using CSS */}
            {[0, 90, 180, 270].map((rotation, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gray-300 origin-left"
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotation + 45}deg)`,
                }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-300 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Center Hub - Non-rotating */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-bunting via-primary to-blue-chill rounded-full shadow-2xl flex items-center justify-center animate-pulse-slow">
          <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center">
            <div className="text-center p-6">
              <div className="text-2xl font-bold text-bunting mb-4 font-newsreader">
                FactrAI
              </div>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="font-semibold">SmartReader AI</div>
                <div className="font-semibold">Data Reciprocity</div>
                <div className="font-semibold">Verified Humans</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary/10 to-blue-chill/10 p-6 rounded-xl border-2 border-primary/20 hover:border-primary transition-colors">
          <h3 className="text-lg font-bold text-bunting mb-2">SmartReader Yield AI</h3>
          <p className="text-sm text-gray-700">
            Dynamic pricing for "perishable" content that isn't converting subscribers.
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-orange-100 p-6 rounded-xl border-2 border-accent/20 hover:border-accent transition-colors">
          <h3 className="text-lg font-bold text-bunting mb-2">Data Reciprocity</h3>
          <p className="text-sm text-gray-700">
            We share first-party user data back with publishers, making us their #1 lead-gen tool.
          </p>
        </div>

        <div className="bg-gradient-to-br from-bunting/10 to-purple-100 p-6 rounded-xl border-2 border-bunting/20 hover:border-bunting transition-colors">
          <h3 className="text-lg font-bold text-bunting mb-2">Verified Human Network</h3>
          <p className="text-sm text-gray-700">
            A "bot-free" signal for premium advertisers, ensuring authentic engagement.
          </p>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-r from-bunting to-primary text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold mb-4 font-newsreader">How It Works</h3>
        <p className="text-lg leading-relaxed">
          Our SmartReader AI identifies content that isn't converting subscribers and offers it to FactrAI users at a market-clearing price. Crucially, we share data back with publishers, making us their #1 lead-gen tool for full subscribers.
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(49, 130, 206, 0.4);
          }
          50% {
            box-shadow: 0 0 60px rgba(49, 130, 206, 0.6);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
