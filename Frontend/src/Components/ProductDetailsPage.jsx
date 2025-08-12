import React, { useEffect, useState } from "react";
import { Loader, Heart, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../Store/useProductsStore";
import { useWishlistStore } from "../Store/useWishlistStore";

const ProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { Products, getProduct, product, getProducts, isProductLoading } = useProductsStore();
    const {
        addingProductId,
        addToWishlist,
        wishlistProductsId,
        getWishlist,
        removeitemfromwishlist,
    } = useWishlistStore();
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    useEffect(() => {
        window.scrollTo(0, 0);
        getProduct(id);
    }, [id, getProduct]);
    useEffect(() => {
        getProducts();
        getWishlist();
    }, [getProducts, getWishlist]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setSelectedImage(product.images[0].image_url);
        }
    }, [product]);
    const additemtowishlist = (id) => {
        addToWishlist(id);
    };
    const getProductDetails = (id) => {
        navigate(`/product/${id}`)
    };


    if (isProductLoading) return (<div className="flex items-center justify-center h-screen w-full">
        <Loader className="size-10 animate-spin" />
    </div>);

    if (!product?.id) return <div className="p-6 text-center">Product not found</div>;

    const recommendedProducts = Products
        .filter((p) => p.id !== Number(id))
        .slice(0, 4);

    return (
        <div className="flex flex-col gap-8 p-6 pt-20 justify-center items-center">
            {/* Left Side Thumbnails */}
            {/* Main Image */}
            <div className="flex flex-col justify-center items-center md:flex-row gap-8 w-full max-w-7xl">
                <div className="hidden md:flex md:flex-col gap-4">
                    {product.images?.map((img, index) => (
                        <img
                            key={index}
                            src={img.image_url}
                            alt={`Thumbnail ${index}`}
                            className={`w-20 h-20 object-cover border rounded cursor-pointer ${selectedImage === img.image_url
                                ? "border-black"
                                : "border-gray-300"
                                }`}
                            onClick={() => setSelectedImage(img.image_url)}
                        />
                    ))}
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={selectedImage}
                        alt="Selected Product"
                        className="max-w-full max-h-[500px] object-contain"
                    />
                </div>
                <div className="flex md:hidden gap-4">
                    {product.images?.map((img, index) => (
                        <img
                            key={index}
                            src={img.image_url}
                            alt={`Thumbnail ${index}`}
                            className={`min-w-18 w-20 h-20 object-cover border rounded cursor-pointer ${selectedImage === img.image_url
                                ? "border-black"
                                : "border-gray-300"
                                }`}
                            onClick={() => setSelectedImage(img.image_url)}
                        />
                    ))}
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-semibold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold">₹{product.price}</span>
                    </div>

                    {/* Quantity & Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            className="px-3 py-1 border rounded cursor-pointer"
                            onClick={decrement}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            className="px-3 py-1 border rounded cursor-pointer"
                            onClick={increment}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="bg-black text-white px-6 py-2 rounded w-full cursor-pointer flex justify-center items-center gap-2" >
                            <ShoppingCart size={15} /> Add to Cart
                        </button>
                        <button
                            className="border px-6 py-2 rounded w-full cursor-pointer flex justify-center items-center gap-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (wishlistProductsId.includes(product.id)) {
                                    removeitemfromwishlist(product.id);
                                } else {
                                    additemtowishlist(product.id);
                                }
                            }}
                        >
                            {addingProductId === product.id ? (
                                <>
                                    <Loader className="animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : wishlistProductsId.includes(product.id) ? (
                                <>
                                    <Heart size={15} className="fill-black" />
                                    <span>Remove from Wishlist</span>
                                </>
                            ) : (
                                <>
                                    <Heart size={15} className="text-black" />
                                    <span>Add to Wishlist</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommended Products */}
            <div className="bg-base-100 py-10 flex flex-col justify-center items-center gap-15 md:gap-5">
                <div className="flex justify-center items-center flex-col pb-6">
                    <h1 className="text-black/75 text-[10px] md:text-sm">
                        YOU MAY ALSO LIKE
                    </h1>
                    <h1 className="text-2xl md:text-3xl">Recommended Products</h1>
                </div>

                <div className="flex justify-around items-center w-full">
                    {isProductLoading ? (
                        <ul className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center px-5 py-5 md:px-10">
                            {Array(8)
                                .fill(null)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="skeleton w-full min-w-38 max-w-75 h-50 md:h-90"
                                    ></div>
                                ))}
                        </ul>
                    ) : (
                        <ul className="grid grid-cols-2 md:grid-cols-4 justify-items-center md:p-10">
                            {recommendedProducts.map((rec) => (
                                <div
                                    key={rec.id}
                                    className="border-black/25 cursor-pointer border-1"
                                    onClick={() => { getProductDetails(rec.id) }}
                                >
                                    <div className="min-w-38 max-w-100 relative">
                                        {addingProductId === rec.id ? (
                                            <Loader className="absolute size-5 top-3 right-3 animate-spin" />
                                        ) : wishlistProductsId.includes(rec.id) ? (
                                            <Heart
                                                className="absolute size-5 top-3 right-3 fill-black"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeitemfromwishlist(rec.id);
                                                }}
                                            />
                                        ) : (
                                            <Heart
                                                className="absolute size-5 top-3 right-3 text-black"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToWishlist(rec.id);
                                                }}
                                            />
                                        )}

                                        <img
                                            src={rec.images[0]?.image_url}
                                            alt={rec.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="py-3 pb-4 flex justify-center items-center flex-col">
                                        <div className="flex justify-center items-center text-center text-[13px] text-black font-medium px-2">
                                            {rec.name}
                                        </div>
                                        <h1 className="text-sm text-black/65">₹ {rec.price}</h1>
                                        <a className="link link-neutral">Shop Now</a>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="btn btn-outline p-6 rounded-4xl hover:bg-transparent hover:text-inherit hover:border-2 border-black transition-all duration-400 ease-in-out" onClick={() => { navigate("/products") }}>
                    Discover The Selection
                </button>
            </div>
        </div >
    );
};

export default ProductPage;
