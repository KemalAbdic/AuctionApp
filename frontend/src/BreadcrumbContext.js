import {createContext, useContext, useState} from "react";

export const BreadcrumbContext = createContext({});
export const useBreadcrumbContext = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({children}) => {

    const [breadcrumbTitle, setBreadcrumbTitle] = useState(null);
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);

    const setBreadcrumb = (title, items) => {
        setBreadcrumbTitle(title);
        setBreadcrumbItems(items);
    }

    const removeBreadcrumb = () => {
        setBreadcrumbTitle(null);
    }

    return (
        <BreadcrumbContext.Provider value={{breadcrumbTitle, breadcrumbItems, setBreadcrumb, removeBreadcrumb}}>
            {children}
        </BreadcrumbContext.Provider>
    );
};