const Banner = () => {
  return (
    <section className="h-96 bg-yellow-900 relative">
      <div className="w-full h-full bg-banner bg-cover opacity-90" />
      <div className="absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl">
        <h2 className="text-6xl">Type Script Shop</h2>
        <p className="text-3xl">Upload Image</p>
      </div>
    </section>
  );
};

export default Banner;
