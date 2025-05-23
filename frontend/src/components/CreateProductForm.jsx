import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ['jeans', 't-shirts', 'shoes', 'glasses', 'jackets', 'suits', 'bags']


const CreateProductForm = () => {

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const {createProduct, loading} = useProductStore();



  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    await createProduct(newProduct);
    setNewProduct({name: '', description: '', price: '', category: '', image: '' })
    } catch (error) {
      console.error('Error creating a product', error.message);
    }
    
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({...newProduct, image: reader.result})
      };
      reader.readAsDataURL(file)
    }
    }

  return (
    <motion.div
    className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{opacity: 1, y: 0}}
    transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create new Product</h2>

      <form  onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Product Name
          </label>
          <input 
          type="text"
          id='name'
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          required
          />
        </div>

        <div>
          <label htmlFor="description" className="text-gray-300 text-sm font-medium block">
            Description
          </label>
          <textarea 
          id='description'
          name='description'
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          className="mt-1 py-2 px-3 text-white bg-gray-700 w-full rounded-md border border-gray-600 block shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
          />
        </div>

        <div>
          <label htmlFor="price" className="text-sm text-gray-300 font-medium block">
            Price
          </label>
          <input 
          type="number"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          step='0.01'
          className="w-full bg-gray-700 py-2 px-3 mt-1 rounded-md border border-gray-600 focus:outline-none shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          required
          />
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium text-gray-300 block">
            Category
          </label>
          <select 
          name="category" 
          id="category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
          className="w-full bg-gray-700 py-2 px-3 mt-1 rounded-md border border-gray-600 focus:outline-none shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          required
          >
            <option value=''>Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}  
          </select>
        </div>

        <div className="mt-1 flex items-center">
          <input 
          type="file"
          id="image"
          className="sr-only"
          accept="image/*"
          onChange={handleImageChange}
          />
          <label 
          htmlFor="image"
          className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && <span className="ml-3 text-sm text-gray-400">Image uploaded</span>}
        </div>

        <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
        disabled={loading}
        >{loading ? (
          <>
            <Loader className="mr-2 h-5 w-5 animate-spin aria-hidden:true" />
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Product
          </>
        )}
        </button>
      </form>
    </motion.div>
  )
}

export default CreateProductForm
