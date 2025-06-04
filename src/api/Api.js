import axios from "axios"

export const ProductData = async () => {
    const products = await axios.get("../../public/phonesDetails.json")
    return products;
}
