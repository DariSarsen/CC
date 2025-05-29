import { Link } from "react-router-dom";
import { IoLogoYoutube, IoLogoInstagram, IoLogoFacebook } from "react-icons/io";

const Home = () => {
    return (
      <>

      {/* Sticky Navbar — поверх фона */}
      <header className="fixed top-0 left-0 w-full z-50 bg-red-900 bg-opacity-20 backdrop-blur-xs px-6 py-5 flex items-center justify-between">
      {/* Logo */}
      <div className="text-white font-bold text-xl flex items-center space-x-5">
        <svg width="50px" height="50px" viewBox="-12 -15 24 30"><path d="M 6 -15 Q -1 -5 -12 1 Q -11 2 -12 3 Q -2 1 2 2 Q 2 1 5 1 Q -4 -1 -9 1 Q 1 -4 6 -12 Q 5 -13 6 -15 M -4 -1 Q 2 -3 9 -1 Q 1 4 -6 12 Q -6 13.5 -6 15 Q 1 6 12 -1 Q 11 -2 12 -3 Q 5 -4 -1 -3 Q -1 -2 -4 -1" fill="#fff"></path></svg>
        
        <Link to="/personal" className="font-kadwa text-xl tracking-widest">LEGACY LINK</Link>
      </div>

      {/* Sign In */}
      <Link to="/login"
        className="inline-block border-2 border-red-500 border-b-red-900 border-t-red-900 text-white px-10 py-2 rounded-full w-max 
             hover:text-red-400 hover:border-red-900 
             transition-all duration-300 ease-in-out text-base font-semibold tracking-widest">
        К І Р У
      </Link>

    </header>

      {/* Фоновое изображение и контент */}
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/alumni.png')] place-content-center">
        <div className="absolute inset-0 bg-red-950 bg-opacity-70 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">

          <h2 className="font-italianno text-7xl mb-4 animate-fade-in-up delay-100">Narxoz Alumni</h2>

          <h1 className="text-6xl tracking-widest mb-6 animate-fade-in-up delay-200 font-semibold">
            Бар керегің — осында. <br />
            Бір-біріңді де табасың.
          </h1>

          <p className="text-xl max-w-2xl animate-fade-in-up delay-300 tracking-wide font-normal">
            Қауымдастық, курстастар, мансаптық мүмкіндіктер? <br />
            Мұның бәрін осы жерден табасың
          </p>

        </div>
      </div>


      <div className=" bg-linear-to-b from-red-900 to-red-950 ">

        <div className="flex flex-col items-center justify-center text-center text-white px-4 py-20">

          {/* Заголовок с кастомным шрифтом */}
          <p className="text-7xl font-italianno animate-fade-in-up delay-500 my-16">
            Narxoz — Stay Connected, Wherever You Are
          </p>

          {/* Контейнер с изображением и текстом */}
          <div className="flex flex-row items-center justify-center w-full max-w-7xl gap-x-16 px-4 animate-fade-in-up delay-600 mb-16">
            
            {/* Блок изображения с карточным стилем */}
            <div className="rounded-3xl shadow-black shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105 w-1/2 max-w-md">
              <img 
                src="/images/students.png" 
                alt="students" 
                className="object-cover w-full h-auto"
              />
            </div>

            {/* Текстовый блок */}
            <div className="text-left max-w-2xl">
              <p className="text-4xl font-semibold mb-4 animate-fade-in-up delay-200">
                Narxoz Alumni қауымдастығының мүшесі бол!
              </p>
              <p className="text-3xl tracking-wide font-normal leading-relaxed animate-fade-in-up delay-300">
                "Legacy Link"-пен байланысың бітіру кешімен аяқталмайды. Өмір сені қайда апарса да, 
                түлектер қауымдастығымен байланыста болып, іс-шараларға қатысып, 
                мансаптық мүмкіндіктерге қол жеткізе аласың.
              </p>
            </div>
          </div>
        </div>
      </div>

          
      {/* Footer */}
      <footer className="text-white text-center bg-[url('/images/footer.jpg')] bg-center bg-no-repeat w-full bg-cover relative  px-12 py-8 ">
        
          <div className="absolute inset-0 bg-red-950 bg-opacity-70 z-0" />

          <div className="relative z-10 flex flex-row items-center justify-between text-center text-whitegap-10">

            <div className="text-left w-max">
              <p className="text-2xl font-semibold mb-4 animate-fade-in-up delay-200">
                БАЙЛАНЫС АҚПАРАТЫ
              </p>
              <p className="text-lg font-light animate-fade-in-up delay-300">
                Қабылдау комиссиясы: <br /> 8 (727) 364-88-99 / 8 (747) 364-88-99 <br />
                Мекенжай: Алматы қ., Жандосов көш., 55, Қазақстан, 050035
              </p>
            </div>
            
            <div className="text-left w-max">
              <p className="text-2xl font-semibold mb-4 animate-fade-in-up delay-200">
                ОҚУҒА ТҮСУ
              </p>
              <p className="text-lg font-light animate-fade-in-up delay-300">
                Бакалавриат<br />Магистратура<br />Докторантура
              </p>
            </div>
            
            <div className="text-left w-max">
              <p className="text-2xl font-semibold mb-4 animate-fade-in-up delay-200">
                БАЙЛАНЫС АҚПАРАТЫ
              </p>
              <p className="text-lg font-light animate-fade-in-up delay-300">
                Құқық және мемлекеттік басқару мектебі<br />Цифрлық технологиялар мектебі<br />Экономика және менеджмент мектебі<br />Бизнес мектебі<br />Гуманитарлық мектеп
              </p>
            </div>
          

          </div>
          

          <div className="relative z-10 flex flex-row items-end justify-between text-center text-white gap-10 pt-20">

            <img 
              src="/images/narxoz.png" 
              alt="students" 
              className="object-cover w-full h-auto max-w-[200px]"
            />
            
            <div className="flex flex-row gap-10 mr-20">
              <IoLogoYoutube size={35}/> 
              <IoLogoInstagram size={35}/>
              <IoLogoFacebook size={35}/> 
            </div>
          

          </div>


      </footer>

      </>

    );
  };
  
  export default Home;
  