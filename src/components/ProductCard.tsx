import { useEffect, useState } from "react";

type Product = {
    id: number,
    name: string,
    price: number,
    category: number,
    image: string
}

const ProductCard = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [searchText, setsearchText] = useState("");
    const [filteredResult, setfilteredResult] = useState<Product | null>();
    const [error, setError] = useState<string | null>("");

    const fetchData = async () => {
        try {
            const response = await fetch('/products.json');
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            const data = await response.json();

            setProducts(data.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    const handleSearch = () => {

        const found = products.find(p => p.name.toLowerCase().includes(searchText.toLowerCase()));

        if (found) {
            setfilteredResult(found);
            setError(null);
        } else {
            setfilteredResult(null);
            setError("No product found with the given name.");
        }
    };


    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className='product-card'>
            <label htmlFor="">Enter Product Name:</label>
            <div className='search-section'>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setsearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>            
            <div className="results-section">

                <div className="product-info">
                {error && <p className="error">{error}</p>}
                {filteredResult &&
                <div className='product-details'>
                    <img className="product-image" src={filteredResult?.image} alt="" />
                    <p className="">ID: {filteredResult?.id}</p>
                    <p className="">Name: {filteredResult?.name}</p>
                    <p className="">Price: {filteredResult?.price}</p>
                    <p className="">Category: {filteredResult?.category}</p>
                </div>}

                </div>

            </div>


        </div>
    )
}

export default ProductCard