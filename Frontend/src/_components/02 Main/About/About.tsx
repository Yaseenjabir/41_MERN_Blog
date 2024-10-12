const About = () => {
  return (
    <>
      <section className="w-full mt-20 px-5 flex flex-col items-center justify-center md:flex-row md:items-start md:gap-5">
        <div className="w-full flex flex-col items-center justify-center text-start max-w-[500px] md:flex-row md:items-start md:gap-5 ">
          <img
            src="https://static.wixstatic.com/media/5a6a58201a2e97b6b7c39b880738af97.jpg/v1/fill/w_278,h_278,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5a6a58201a2e97b6b7c39b880738af97.jpg"
            className="w-full"
          />
          <div className="w-full py-5 flex flex-col gap-4 md:p-0">
            <h1 className="text-xl font-bold">MADE BY SOPHIE WITH LOVE</h1>
            <hr className="w-[40px] border-black border-[2px]" />
            <p className="underline text-gray-700">About Me</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center text-start max-w-[500px] md:flex-row md:items-start md:gap-5">
          <img
            src="https://static.wixstatic.com/media/a38016_25951c0846654461a160c99568cd6f52.png/v1/fill/w_280,h_280,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/a38016_25951c0846654461a160c99568cd6f52.png"
            className="w-full"
          />
          <div className="w-full py-5 flex flex-col gap-4 md:p-0">
            <h1 className="text-xl font-bold">MY COOKBOOK</h1>
            <hr className="w-[40px] border-black border-[2px]" />
            <div className="w-full">
              <p className="underline text-gray-700">Available at:</p>
              <ul className="flex flex-col text-[15px] mt-3">
                <li>Broadway Books</li>
                <li>Hungry Reads</li>
                <li>Gracy's Book Shop</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
