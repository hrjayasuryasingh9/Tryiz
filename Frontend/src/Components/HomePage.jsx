import React, { useEffect } from "react";
import { useProductsStore } from "../Store/useProductsStore.js";
import { Heart, Loader } from "lucide-react";
import { useWishlistStore } from "../Store/useWishlistStore.js";
import { useCartStore } from "../Store/useCartStore.js";
import main from "../../public/Assest/Hero.jpeg";
import main2 from "../../public/Assest/Hero2.png";
import main3 from "../../public/Assest/Hero3.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { Products, getProducts, isProductLoading } = useProductsStore();
  const {
    getCartCount, cartCount
  } = useCartStore();
  const {
    addingProductId,
    addToWishlist,
    wishlistProductsId,
    getWishlist,
    removeitemfromwishlist,
    getWishlistCount
  } = useWishlistStore();

  useEffect(() => {
    getCartCount();
    getWishlistCount();
  }, [getCartCount, getWishlistCount]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  const sunGlasses = Products.filter(
    (product) => product.category === "Sun Glasses"
  ).slice(0, 6);

  const others = Products.filter(
    (product) => product.category === "Optical Frames"
  ).slice(0, 6);

  const getProductDetails = (id) => {
    navigate(`/product/${id}`)
  };
  const additemtowishlist = (id) => {
    addToWishlist(id);
  };

  return (
    <div>
      <div className="h-19"></div>
      <div
        className="h-[400px] w-full bg-center bg-cover bg-no-repeat md:h-[670px]"
        style={{
          backgroundImage:
            `url("${main}")`,
        }}
      >
        <div className="flex justify-center items-center flex-col h-full bg-black/10 text-base-300">
          <h1 className="text-5xl font-semibold">TRYIZ</h1>
          <p className="text-xl text-center max-w-3xl pt-10 px-5">
            See the world clearly. Style your vision with Tryiz – your trusted
            optical destination.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl py-10 sm:inline text-lg">
          EXPLORE THE SELECTION
        </h1>
        <div className="flex justify-center items-center w-full px-5 pb-5 md:pt-2">
          <div className="flex justify-center items-center gap-5 md:gap-20">
            <div className="flex justify-between items-center flex-col">
              <div className="min-w-[120px] max-w-[350px]" onClick={() => { navigate("/products") }}>
                <img
                  src="https://ap.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Homepage/2024/central/category/women_sunglasses/Women_SG_WW_HP_Category_Push_20240614_DII.jpg"
                  alt="no image found"
                  className="h-full w-full"
                />
              </div>
              <p className="py-3 text-sm md:text-lg" onClick={() => { navigate("/products") }}>Unisexual Sun Glasses</p>
            </div>
            <div className="flex justify-between items-center flex-col">
              <div className="min-w-[120px] max-w-[350px]">
                <img
                  src="https://ap.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Homepage/2024/central/category/women_sunglasses/Women_SG_WW_HP_Category_Push_20240614_DII.jpg"
                  alt="no image found"
                  className="h-full w-full"
                />
              </div>
              <p className="py-3 text-sm md:text-lg">Unisexual Eye Wear</p>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div
          className="h-[400px] w-full bg-[position:50%_40%] bg-cover bg-no-repeat md:h-[670px]"
          style={{
            backgroundImage:
              `url("${main3}")`
          }}
        ></div>
        <div className="z-10 bg-base-100">
          <div className="flex justify-center items-center flex-col pt-6">
            <h1 className="text-black/75 text-[10px] md:text-sm">UNISEX</h1>
            <h1 className="text-2xl md:text-3xl">Sun Glasses</h1>
          </div>
          <div className="flex justify-around items-center w-full">
            {isProductLoading ? (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-10 justify-items-center px-5 py-5 md:px-10 w-280">
                {Array(6)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="skeleton w-full min-w-38 max-w-75 h-50 md:h-90"
                    ></div>
                  ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 justify-items-center p-5 md:p-10 w-280 border-b-black ">
                {sunGlasses.map((product) => (
                  <div
                    key={product.id}
                    className="border-black/25 cursor-pointer border-1"
                    onClick={() => { getProductDetails(product.id) }}
                  >
                    <div className="min-w-38 max-w-100 relative">
                      {addingProductId === product.id ? (
                        <Loader className="absolute size-5 top-3 right-3 animate-spin" />
                      ) : wishlistProductsId.includes(product.id) ? (
                        <Heart
                          className="absolute size-5 top-3 right-3 fill-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeitemfromwishlist(product.id);
                          }}
                        />
                      ) : (
                        <Heart
                          className="absolute size-5 top-3 right-3 text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            additemtowishlist(product.id);
                          }}
                        />
                      )}

                      <img
                        src={product.images[0]?.image_url}
                        alt={product.name}
                        className="h-[100%] w-[100%] object-cover"
                      />
                    </div>
                    <div className="py-3 pb-4 flex justify-center items-center flex-col">
                      <div className="flex justify-center items-center text-center text-[13px] text-black font-medium px-2">
                        {product.name}
                      </div>

                      <a className="link link-neutral">Shop Now</a>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center items-center py-10 mb-10">
            <button className="btn btn-outline p-6 rounded-4xl hover:bg-transparent hover:text-inherit hover:border-2 border-black transition-all duration-400 ease-in-out" onClick={() => { navigate("/products") }}>
              Discover The Selection
            </button>
          </div>
        </div>
      </section>
      <section>
        <div
          className="h-[400px] w-full bg-left md:bg-center bg-cover bg-no-repeat md:h-[670px]"
          style={{
            backgroundImage:
              `url("${main2}")`
            ,
          }}
        ></div>
        <div className="z-10 bg-base-100">
          <div className="flex justify-center items-center flex-col pt-6">
            <h1 className="text-black/75 text-[10px] md:text-sm">UNISEX</h1>
            <h1 className="text-2xl md:text-3xl">Opticals</h1>
          </div>
          <div className="flex justify-around items-center w-full">
            {isProductLoading ? (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-10 justify-items-center px-5 py-5 md:px-10 w-280">
                {Array(6)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="skeleton w-full min-w-38 max-w-75 h-50 md:h-90"
                    ></div>
                  ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 justify-items-center p-5 md:p-10 w-280 border-b-black ">
                {sunGlasses.map((product) => (
                  <div
                    key={product.id}
                    className="border-black/25 cursor-pointer border-1"
                    onClick={() => { getProductDetails(product.id) }}
                  >
                    <div className="relative min-w-38 max-w-100 ">
                      {addingProductId === product.id ? (
                        <Loader className="absolute size-5 top-3 right-3 animate-spin" />
                      ) : wishlistProductsId.includes(product.id) ? (
                        <Heart
                          className="absolute size-5 top-3 right-3 fill-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeitemfromwishlist(product.id);
                          }}
                        />
                      ) : (
                        <Heart
                          className="absolute size-5 top-3 right-3 text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            additemtowishlist(product.id);
                          }}
                        />
                      )}
                      <img
                        src={product.images[0]?.image_url}
                        alt={product.name}
                        className="h-[100%] w-[100%] object-cover"
                      />
                    </div>
                    <div className="py-3 pb-4 flex justify-center items-center flex-col">
                      <h1 className="text-[13px] text-black font-medium text-center px-2">
                        {product.name}
                      </h1>
                      <a className="link link-neutral">Shop Now</a>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center items-center py-10">
            <button className="btn btn-outline p-6 rounded-4xl hover:bg-transparent hover:text-inherit hover:border-2 border-black transition-all duration-400 ease-in-out" onClick={() => { navigate("/products") }}>
              Discover The Selection
            </button>
          </div>
        </div>
      </section >
      <section>
        <div className="flex justify-center items-center text-2xl font-semibold pt-10 pb-3 md:text-3xl">
          TRYIZ SERVICES
        </div>
        <div className="flex justify-center items-center">
          <p className=" text-[15px] max-w-3xl text-center text-black/75 pb-7 px-2">
            TRIYZ offers complimentary personalization, book-an-eye-test
            appointments, and a range of exclusive optical services for a
            seamless eyewear experience.
          </p>
        </div>
        <div className="flex justify-center items-center p-5">
          <div className="carousel rounded-box min-w-50 max-w-90 hide-carousel">
            <div className="carousel-item w-full flex justify-center items-center flex-col">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://i.pinimg.com/originals/6f/e2/38/6fe238ebc2b6c9e78d4628c0ef4e6738.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">PERSONALIZATION</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
            <div className="carousel-item w-full flex justify-center items-center flex-col">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://thumbs.dreamstime.com/b/ophthalmologist-selects-glasses-female-patient-optical-shop-choosing-transparent-lenses-appointment-366376766.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">BOOK AN APPOINTMENT</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
            <div className="carousel-item w-full flex justify-center items-center flex-col">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://res.cloudinary.com/dfiaegs54/image/upload/v1744183990/Adobe_Express_-_file_m5kdrc.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">OTHER SERVICES</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center hide-i-carousel">
            <div className="w-full flex justify-center items-center flex-col min-w-50 max-w-95">
              <div className="w-full overflow-hidden p-2">
                <img
                  src="https://i.pinimg.com/originals/6f/e2/38/6fe238ebc2b6c9e78d4628c0ef4e6738.jpg"
                  className="w-full h-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">PERSONALIZATION</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
            <div className="w-full flex justify-center items-center flex-col min-w-50 max-w-95">
              <div className="w-full overflow-hidden p-2">
                <img
                  src="https://thumbs.dreamstime.com/b/ophthalmologist-selects-glasses-female-patient-optical-shop-choosing-transparent-lenses-appointment-366376766.jpg"
                  className=""
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">BOOK AN APPOINTMENT</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>{" "}
            <div className="w-full flex justify-center items-center flex-col min-w-50 max-w-95">
              <div className="w-full overflow-hidden p-2 mx-auto">
                <img
                  src="https://res.cloudinary.com/dfiaegs54/image/upload/v1744183990/Adobe_Express_-_file_m5kdrc.jpg"
                  className="w-full h-full object-cover"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">Other Services</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
};

export default HomePage;
