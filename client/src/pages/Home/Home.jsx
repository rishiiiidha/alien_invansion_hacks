import * as React from "react";

const CardItem = ({ imageSrc, title, link }) => (
  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
    <a
      href={link}
      className="flex relative flex-col grow px-1 py-8 text-6xl text-center text-orange-100 whitespace-nowrap rounded-lg border border-orange-100 border-dashed tracking-[5.6px] max-md:mt-10 max-md:text-4xl"
    >
      <img
        loading="lazy"
        src={imageSrc}
        alt={`${title} illustration`}
        className="w-full aspect-[1.72]"
      />
      <div className="mt-5 border-2 border-black border-solid max-md:text-4xl">
        {title}
      </div>
    </a>
  </div>
);

function Home() {
  const cardData = [
    {
      imageSrc: "/chat-img.png",
      title: "Chat",
      link: "/areyouhuman",
    },
    {
      imageSrc:"/guide-img.png",
      title: "Guide",
      link: "/guide",
    },
    {
      imageSrc:"globe-img.png",
      title: "Map",
      link: "/map",
    },
  ];

  const cardData2 = [
    {
      imageSrc:
        "/games.png",
      title: "Game",
      link: "/game",
    },
    {
      imageSrc:
        "/stories.png",
      title: "Story",
      link: "/stories",
    },
  ];

  return (
    <div className="flex flex-col justify-center bg-black">
      <main className="flex overflow-hidden relative flex-col items-center pt-16 pr-16 pl-6 w-full min-h-[1809px] max-md:px-5 max-md:max-w-full">
        <header className="flex relative gap-5 justify-between items-start w-full max-w-[1283px] max-md:flex-wrap max-md:max-w-full">
          <nav className="flex flex-col">
            <div className="shrink-0 bg-zinc-300 h-[9px]" />
            <div className="shrink-0 mt-1.5 h-2 bg-zinc-300" />
            <div className="shrink-0 mt-1.5 bg-zinc-300 h-[9px]" />
          </nav>
          <img
            loading="lazy"
            src="/space-tech.png"
            alt="Logo"
            className="mt-1.5 aspect-[9.09] w-[379px]"
          />
        </header>
        <img
          loading="lazy"
          src="/alien-img.png"
          alt="Decorative element"
          className="self-start mt-48 ml-80 max-w-full aspect-square w-[295px] max-md:mt-10 max-md:ml-2.5"
        />
        <img
          loading="lazy"
          src="/heading-img.png"
          alt="Main banner"
          className="mt-20 w-full aspect-[10] max-w-[1149px] max-md:mt-10 max-md:max-w-full"
        />
        <h2 className="relative self-end mt-16 text-2xl tracking-wider text-center text-white text-opacity-80 max-md:mt-10 max-md:max-w-full">
          Unite, Navigate, Survive. Your Lifeline in a World Under Siege
        </h2>
        <h3 className="relative mt-28 text-3xl tracking-widest text-center text-white text-opacity-80 max-md:mt-10 max-md:max-w-full">
          SELECT ONE BELOW TO HIDE FROM DANGER
        </h3>
        <section className="relative px-4 mt-16 w-full max-w-[1256px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {cardData.map((card, index) => (
              <CardItem
                key={index}
                imageSrc={card.imageSrc}
                title={card.title}
                link={card.link}
              />
            ))}
          </div>
        </section>

        {/* Add looping video here */}
        <div className="relative mt-16 w-full max-w-[1256px] px-4 text-center text-white">
          <h2 className="text-4xl font-bold">Stay Alert!</h2>
          <p className="mt-4 text-xl">
            The invasion is ongoing, stay tuned for updates and be prepared to
            move to safer locations.
          </p>
        </div>

        <section className="relative px-4 mt-16 w-full max-w-[1256px] lg:ml-96 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {cardData2.map((card, index) => (
              <CardItem
                key={index}
                imageSrc={card.imageSrc}
                title={card.title}
                link={card.link}
              />
            ))}
          </div>
        </section>

        <footer className="flex relative gap-5 self-stretch mt-56 text-2xl tracking-wider text-center text-white text-opacity-80 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <img
            loading="lazy"
            src="/alien-end-img.png"
            alt="Footer logo"
            className="shrink-0 max-w-full aspect-[0.78] w-[110px]"
          />
          <p className="flex-auto self-start max-md:max-w-full">
            Together We Stand. Map Your Escape. Master Survival
          </p>
        </footer>
      </main>
    </div>
  );
}

export default Home;
