import React, { useEffect } from "react";
import { Loader, Heart } from "lucide-react";
import { useProductsStore } from "../Store/useProductsStore";
import { useWishlistStore } from "../Store/useWishlistStore";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
    const navigate = useNavigate();
    const { Products, getProducts, isProductLoading } = useProductsStore();
    const {
        addingProductId,
        addToWishlist,
        wishlistProductsId,
        getWishlist,
        removeitemfromwishlist,
    } = useWishlistStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        getProducts();
        getWishlist();
    }, [getProducts, getWishlist]);

    const getProductDetails = (id) => {
        navigate(`/product/${id}`)
    };

    return (
        <div className="bg-base-100">
            {/* Hero Banner */}
            <div className="relative w-full h-[400px] md:h-[670px] pt-18">
                <img
                    src="../../public/Assest/Hero.jpeg"
                    alt="Hero Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold">Sun Glasses Collection</h1>
                    <p className="text-sm md:text-lg mt-2">
                        Stylish, comfortable, and made for everyone.
                    </p>
                </div>
            </div>

            {/* Products Showcase */}
            <div className="flex justify-center items-center flex-col pt-6">
                <h1 className="text-black/75 text-[10px] md:text-sm">UNISEX</h1>
                <h1 className="text-2xl md:text-3xl">Sun Glasses</h1>
            </div>

            <div className="flex justify-around items-center w-full">
                {isProductLoading ? (
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center px-5 py-5 md:px-10">
                        {Array(8) // for 4-column skeletons, use 8 or any number divisible by 4
                            .fill(null)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="skeleton w-full min-w-38 max-w-75 h-50 md:h-90"
                                ></div>
                            ))}
                    </ul>
                ) : (
                    <ul className="grid grid-cols-2 md:grid-cols-4  justify-items-center p-5 md:p-10">
                        {Products.map((product) => (

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
                                                addToWishlist(product.id);
                                            }}
                                        />
                                    )}

                                    <img
                                        src={product.images[0]?.image_url}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="py-3 pb-4 flex justify-center items-center flex-col">
                                    <div className="flex justify-center items-center text-center text-[13px] text-black font-medium px-2">
                                        {product.name}
                                    </div>
                                    <h1 className="text-sm text-black/65">₹ {product.price}</h1>
                                    <a className="link link-neutral">Shop Now</a>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>

            {/* View More Button */}
            <div className="flex justify-center py-8">
                <button
                    onClick={() => console.log("Load more products")}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 transition"
                >
                    View More
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
