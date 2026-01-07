import { createContext, useContext, useState } from "react";


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [selectedProducts, setSelectedProducts] = useState(null);

    return (
        <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
export const useProductContext = () => {
    return useContext(ProductContext);
};