import Image from "next/image";

const TechLogoBanner = () => {
  const techLogos = [
    { name: "OpenAI", logo: "/techlogos/openai.svg" },
    { name: "Canva", logo: "/techlogos/canva.svg" },
    { name: "Warp.dev", logo: "/techlogos/warp.svg"},
    { name: "GitHub Copilot", logo: "/techlogos/github.svg"},
    { name: "Google Gemini", logo: "/techlogos/gemini.svg"},
    { name: "Capcut", logo: "/techlogos/capcut.svg"},
    { name: "Grok AI", logo: "/techlogos/grok.svg"},
    { name: "Youtube", logo: "/techlogos/youtube.svg"},
    { name: "Adobe", logo: "/techlogos/adobe.svg"}


    
  ];

  // Create multiple duplicates for seamless infinite scroll
  const duplicatedLogos = [
    ...techLogos,
    ...techLogos,
    ...techLogos,
    ...techLogos,
    ...techLogos,
    ...techLogos
  ];

  return (
    <section className="w-full bg-muted/30 py-12 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">
          Đối tác công nghệ
        </h2>
      </div>
      
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <div className="logo-scroll-wrapper">
          <div className="logo-scroll-track">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="logo-item group"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-400 flex flex-col items-center">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <Image
                      src={logo.logo}
                      alt={logo.name}
                      width={48}
                      height={48}
                      className="object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center font-medium group-hover:text-foreground transition-colors">
                    {logo.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechLogoBanner;