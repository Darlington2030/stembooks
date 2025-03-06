"use client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const colorOptions = ["Black & White", "Colored"];
const sizeOptions = ["A4", "A5"];
const orientationOptions = ["Portrait", "Landscape"];

export default function Quote() {
    const [quoteData, setQuoteData] = useState({
        pages: "",
        colorType: colorOptions[0],
        size: sizeOptions[0],
        orientation: orientationOptions[0],
    });

    const [pdfFile, setPdfFile] = useState(null);
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    const handleChange = (e) => {
        setQuoteData({ ...quoteData, pages: e.target.value });
        calculatePrice({ ...quoteData, pages: e.target.value });
    };

    const calculatePrice = (data) => {
        const { pages, colorType, size } = data;
        const baseRate = colorType === "Colored" ? 0.5 : 0.3;
        const sizeFactor = size === "A4" ? 1.5 : 1.3;
        const price = (pages * baseRate * sizeFactor).toFixed(2);
        setEstimatedPrice(price);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
        } else {
            alert("Please upload a valid PDF file.");
            setPdfFile(null);
        }
    };

    const handleAddToCart = async () => {
        if (!pdfFile) {
            alert("Please upload a PDF first.");
            return;
        }
        alert("Book added to cart!");
    };

    // Dropdown
    const CustomDropdown = ({ options, value, onChange, label }) => (
        <div className="w-full sm:text-lg">
            <label className="block font-semibold text-gray-800 mb-1">{label}</label>
            <Listbox value={value} onChange={onChange}>
                <div className="relative">
                    <Listbox.Button className="w-full py-2 pl-3 pr-10 text-left bg-white border border-orange rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange">
                        <span className="text-black block truncate">{value}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="w-5 h-5 text-orange" />
                        </span>
                    </Listbox.Button>

                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-orange rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option}
                                value={option}
                                className={({ active }) =>
                                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                        active ? "bg-gray-bg text-orange" : "text-gray-800"
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? "font-semibold text-orange" : ""}`}>
                                            {option}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange">
                                                <Check className="w-5 h-5" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );

    return (
        <div className="min-h-screen mt-[-3rem] flex items-center justify-center bg-gray-bg px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg space-y-6">
                <h1 className="text-2xl font-bold text-center text-orange">Self-Publishing Made Easy – Get a Quote!</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pages */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block font-semibold text-gray-800">Number of Pages</label>
                        <input
                            type="number"
                            name="pages"
                            value={quoteData.pages}
                            onChange={handleChange}
                            className="w-full border border border-orange rounded-lg p-2  text-black"
                        />
                    </div>

                    {/* Color Type */}
                    <div className="col-span-2 sm:col-span-1">
                        <CustomDropdown
                            label="Color Type"
                            options={colorOptions}
                            value={quoteData.colorType}
                            onChange={(value) => {
                                setQuoteData({ ...quoteData, colorType: value });
                                calculatePrice({ ...quoteData, colorType: value });
                            }}
                        />
                    </div>

                    {/* Size */}
                    <div className="col-span-2 sm:col-span-1">
                        <CustomDropdown
                            label="Paper Size"
                            options={sizeOptions}
                            value={quoteData.size}
                            onChange={(value) => {
                                setQuoteData({ ...quoteData, size: value });
                                calculatePrice({ ...quoteData, size: value });
                            }}
                        />
                    </div>

                    {/* Orientation */}
                    <div className="col-span-2 sm:col-span-1">
                        <CustomDropdown
                            label="Orientation"
                            options={orientationOptions}
                            value={quoteData.orientation}
                            onChange={(value) => setQuoteData({ ...quoteData, orientation: value })}
                        />
                    </div>

                    {/* PDF Upload */}
                    <div className="col-span-2">
                        <label className="block font-semibold text-gray-800">Upload PDF</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileUpload}
                            className="text-black w-full border border-yellow rounded-lg p-2 focus:ring-2 focus:ring-orange"
                        />
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-lg font-bold text-gray-800">
                        Estimated Price: <span className="text-orange">${estimatedPrice}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="col-span-2">
                        {pdfFile && (
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-orange hover:bg-orange-600 text-white py-3 rounded-lg transition"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
