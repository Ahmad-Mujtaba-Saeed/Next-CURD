'use client';
import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditProductForm({ID , Name , Price , Category}) {

    const router = useRouter();

    const [FormData, setFormData] = useState({
        ID:ID,
        Name: Name,
        Image: '',
        Price: Price,
        Category: Category
      });
      
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          Image: file
        }));
      };

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/updateProduct', FormData , {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            if(response.data.success == true){
                setFormData({
                    ID:'',
                    Name:'',
                    Category:'',
                    Price:'',
                    Image:''
                });
                console.log('Image uploaded successfully:', response.data);
                router.refresh();
                router.push('/products');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
    };



  return (
    <>
        <div className="px-5 md:px-24 lg:px-24">
            <div className="flex flex-col">
                <div className="text-center">
                    <h3 className="text-2xl">Edit Product # {FormData.ID}</h3>
                </div>
                <Input
                    divClassName="w-full mt-5"
                    inputClassName="input input-bordered w-full"
                    placeholder="Enter Name of Product"
                    type="text"
                    name="Name"
                    value={FormData.Name}
                    onChange={handleFormData}
                />
                <Input
                    divClassName="w-full mt-5"
                    inputClassName="file-input file-input-bordered file-input-primary w-full"
                    placeholder=""
                    type="file"
                    name="Image"
                    onChange={handleImageChange}
                />
                <Input
                    divClassName="w-full mt-5"
                    inputClassName="input input-bordered w-full"
                    placeholder="Enter Price of Product"
                    type="number"
                    name="Price"
                    value={FormData.Price}
                    onChange={handleFormData}
                />
                <Input
                    divClassName="w-full mt-5"
                    inputClassName="input input-bordered w-full"
                    placeholder="Enter Product Category"
                    type="text"
                    name="Category"
                    value={FormData.Category}
                    onChange={handleFormData}
                />
                <button type="button" onClick={handleSubmit} className="btn btn-primary w-full mt-4">
                    Edit Product
                </button>
            </div>
        </div>
    </>
  )
}
