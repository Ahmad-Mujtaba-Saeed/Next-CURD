'use server';
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import DeleteProduct from "./DeleteProduct";

// Fetch products from the API
export async function getProducts() {
  try {
    console.log("Fetching products from API...");
    const response = await axios.get('http://127.0.0.1:8000/api/getProducts');
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

export default async function ProductList() {
  const products = await getProducts() || [];

  return (
    <>
      <div className="overflow-x-auto py-18">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h1 className="font-bold text-2xl">Next js CURD application with tailwindcss and daisyUI</h1>
          </div>
          <div className="text-right">
            <Link className="btn btn-primary" href={'/addproduct'}>
              Add Product
            </Link>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                            <Image
                                src={product.image_url}
                                alt="Product Image"
                                width={30}
                                height={30}
                                layout="fixed"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.Name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">{product.Category}</span>
                      </td>
                      <td>{product.Price}</td>
                      <th>
                      <Link href={`editProduct/${product.id}`}>
                        <button className="btn btn-primary">Edit</button>
                      </Link>&nbsp;|  &nbsp;
                      <DeleteProduct ID={product.id}/>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No products available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
