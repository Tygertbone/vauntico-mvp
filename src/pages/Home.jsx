import { useState, useEffect } from 'react';

export default function Home() {
  const [terminalText, setTerminalText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const command = '$ vauntico generate landing-page --workshop "creator-monetization"';

  const outputs = [
    { text: '✓ Analyzing workshop content...', delay: 0 },
    { text: '✓ Generating trust score algorithm...', delay: 400 },
    { text: '✓ Building payment integration...', delay: 800 },
    { text: '✓ Creating email sequences...', delay: 1200 },
  ];

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const typingSpeed = 50;

    const typingInterval = setInterval(() => {
      if (i < command.length) {
        setTerminalText(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">

      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="
          absolute inset-0
          bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10
          animate-gradient-shift
          blur-3xl
        "/>

        {/* Grid overlay */}
        <div className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:50px_50px]
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
        "/>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="
            px-4 py-2
            bg-white/10
            backdrop-blur-sm
            border border-white/20
            rounded-full
            text-sm text-gray-300
            flex items-center gap-2
          ">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
            Used by 500+ creators
          </div>
        </div>

        {/* Headline */}
        <h1 className="
          text-4xl md:text-6xl lg:text-7xl
          font-bold
          tracking-tighter
          leading-[0.95]
          mb-6
        ">
          <span className="text-white">Build Your</span>
          <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Creator Business
          </span>
          <br/>
          <span className="text-white/60 text-3xl md:text-4xl">
            in Minutes, Not Months
          </span>
        </h1>

        {/* Subheadline */}
        <p className="
          text-xl md:text-2xl
          text-gray-400
          leading-relaxed
          max-w-3xl
          mx-auto
          mb-12
        ">
          CLI automation meets trust scoring. Ship landing pages, workshops,
          and payment flows—AI handles the code, you handle the vision.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="/pricing" className="
            inline-block px-8 py-4
            bg-gradient-to-r from-indigo-600 to-purple-600
            rounded-xl
            font-semibold text-lg
            hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500
            transition-all duration-300
            hover:shadow-lg
            transform hover:scale-105
          ">
            Start Building Free →
          </a>

          <a href="/about" className="
            inline-block px-8 py-4
            bg-white/10
            backdrop-blur-sm
            border border-white/20
            rounded-xl
            font-semibold text-lg
            hover:bg-white/20
            transition-all duration-300
          ">
            Watch Demo (2 min)
          </a>
        </div>

        {/* Trust Indicator */}
        <div className="text-sm text-gray-500 mb-16">
          Trusted by agencies · Open source components
        </div>

        {/* Terminal Demo */}
        <div className="max-w-5xl mx-auto">
          <div className="
            relative
            bg-black
            border border-white/10
            rounded-2xl
            overflow-hidden
            hover:shadow-[0_10px_30px_rgba(102,126,234,0.15)]
            transition-shadow duration-300
          ">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"/>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"/>
                <div className="w-3 h-3 rounded-full bg-green-500/80"/>
              </div>
              <span className="text-xs text-gray-500 ml-2">terminal — vauntico</span>
            </div>

            {/* Terminal Content */}
            <div className="p-8 font-mono text-sm md:text-base">
              {/* Animated command */}
              <div className="mb-6">
                <span className="text-cyan-400">{terminalText}</span>
                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
              </div>

              {/* Animated output */}
              {showOutput && (
                <div className="space-y-2">
                  {outputs.map((output, idx) => (
                    <div
                      key={idx}
                      className="text-gray-400 flex items-center gap-2 animate-fade-in"
                      style={{ animationDelay: `${output.delay}ms` }}
                    >
                      <span className="text-green-400">✓</span>
                      {output.text}
                    </div>
                  ))}

                  <div className="mt-6 pt-4 border-t border-white/10 animate-fade-in">
                    <span className="text-green-400">🚀 </span>
                    <span className="text-gray-300">Landing page deployed: </span>
                    <span className="text-cyan-400 underline">yoursite.vercel.app</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1 animate-bounce">
            <div className="w-1 h-2 bg-white/40 rounded-full mx-auto"/>
          </div>
        </div>
      </div>

    </section>
  );
}
