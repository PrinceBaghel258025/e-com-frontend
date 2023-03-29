import { useParams } from "react-router-dom";
import Products from "./Products";

const ByCategory = () => {
    const params = useParams()
    // console.log(params)
    return (
        <>
            <Products category={`product/products-by-category/?category=${params.category}`} />
        </>)
}

export default ByCategory