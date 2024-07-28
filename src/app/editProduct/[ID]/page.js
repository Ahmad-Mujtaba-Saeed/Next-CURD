import EditProductForm from "@/components/EditProductForm"
import axios from "axios";

export async function getProduct(ID) {
  try {
    console.log("Fetching products from API...");
    const response = await axios.get(`http://127.0.0.1:8000/api/getProduct?ID=${ID}`);
    console.log("API response received:", response.data);

    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function page({params}) {
  const {ID} = params;
  const product = await getProduct(ID) || [];
  const {Name, Price , Category } = product;
  return (
    <>
      <EditProductForm ID={ID} Name={Name} Category={Category} Price={Price}/>
    </>
  )
}
