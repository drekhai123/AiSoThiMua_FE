const Hero = () => {
    return (
      <section className="relative pt-32 pb-15 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Lưới nền mờ */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-[url('/path-to-your-grid-background.svg')] bg-center"></div>
          {/* Ánh sáng tỏa ra từ trung tâm */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-primary/10 rounded-full blur-3xl" />
        </div>
  
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-y-8">
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Chào mừng đến{' '}
              {/* Hiệu ứng gradient cho tên thương hiệu */}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ASTM
              </span>
            </h1>
  
            {/* Subheading */}
            <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              Cung cấp tài khoản AI và dịch vụ công nghệ số uy tín, chất lượng cao.
            </p>
  
            {/* Call-to-Action Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <button className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Khám Phá Sản Phẩm
              </button>
              <button className="bg-background border border-border text-foreground font-semibold px-8 py-3 rounded-lg hover:bg-muted transition-colors">
                Tìm Hiểu Thêm
              </button>
            </div> */}
  
            {/* Social Proof (Optional) */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <p className="text-sm text-muted-foreground">
                ✨Sự đồng hành cùng bạn là niềm hạnh phúc của chúng tôi✨
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;