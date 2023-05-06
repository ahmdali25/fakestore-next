'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'


export default function Home() {
  const [products, setProductsData] = useState([]);
  const [categories, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('lowToHigh');
  const [limitProduct, setLimitProduct] = useState(5);
  const [isLoading, setLoading] = useState(true);
  const totals = [5,10,20];

  function handleChangeCategory(e) {
    setSelectedCategory(e.target.value);
  }

  function handleFilterProducts(e) {
    setLimitProduct(e.target.value);
    fetchProductsByLimit(e.target.value);
  }

  const fetchProductsByLimit = async (limit) => {
    setLoading(true);
    const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    const data = await response.json();
    setProductsData(data);
    setLoading(false);
  }

  const fetchCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    const arrData = ['All'];
    for (let i = 0; i < data.length; i++) {
      arrData.push(data[i]);
    }
    setCategoriesData(arrData);
  }

  function handleSortByPrice(e) {
    setSelectedSort(e.target.value);
  }
  
  
  useEffect(() => {
    // fecth products
    // const fetchProducts = async () => {
    //   const response = await fetch('https://fakestoreapi.com/products');
    //   const data = await response.json();
    //   setProductsData(data);
    //   setLoading(false);
    // }

    fetchCategories();
    fetchProductsByLimit(5);
  }, []);

  // filtered products by category
  const filteredProductsByCategory = selectedCategory !== 'All' ? products.filter((product) => product.category === selectedCategory) : products;

  // sorted filtered products by price
  const sorteredProductsByPrice = selectedSort === 'lowToHigh' ? filteredProductsByCategory.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) : filteredProductsByCategory.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));;

  if (isLoading)
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='flex'>
        <select onChange={handleChangeCategory} id="select-category" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 md:w-full p-2.5'>
          { categories.map((category, index) => (
            <option key={index} value={category}>{ category }</option>
          ))}
        </select>
      </div>
      <div className='flex'>
        <select value={limitProduct} onChange={handleFilterProducts} id="select-category" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 md:w-full p-2.5'>
          { totals.map((total, index) => (
            <option key={index} value={total}>{ total }</option>
          ))}
        </select>
      </div>
      <div className="flex">
        <div className="flex items-center mr-4">
            <input id="inline-radio" type="radio" value="lowToHigh" checked={selectedSort === 'lowToHigh'} onChange={handleSortByPrice} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
            <label htmlFor="inline-radio" className="ml-2 text-sm font-medium text-gray-900">Low to high</label>
        </div>
        <div className="flex items-center mr-4">
            <input id="inline-2-radio" type="radio" value="highToLow" checked={selectedSort === 'highToLow'} onChange={handleSortByPrice} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
            <label htmlFor="inline-2-radio" className="ml-2 text-sm font-medium text-gray-900">High to low</label>
        </div>
      </div>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
      { Array(5).fill().map((item, index) => (
        <div key={index} className="max-w-sm h-96 bg-white rounded overflow-hidden shadow-lg">
          <div className="flex items-center justify-center pt-4">
            <div className="flex items-center justify-center w-52 h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
            </div>
          </div>
          <div className='px-4 py-4'>
            <div class="h-5 w-64 bg-gray-200 rounded-lg dark:bg-gray-700 mb-4"></div>
            <div class="h-4 w-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-8"></div>
            <div class="h-5 w-20 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  </main>
  )

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex'>
          <select onChange={handleChangeCategory} id="select-category" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 md:w-full p-2.5'>
            { categories.map((category, index) => (
              <option key={index} value={category}>{ category }</option>
            ))}
          </select>
        </div>
        <div className='flex'>
          <select value={limitProduct} onChange={handleFilterProducts} id="select-category" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 md:w-full p-2.5'>
            { totals.map((total, index) => (
              <option key={index} value={total}>{ total }</option>
            ))}
          </select>
        </div>
        <div className="flex">
          <div className="flex items-center mr-4">
              <input id="inline-radio" type="radio" value="lowToHigh" checked={selectedSort === 'lowToHigh'} onChange={handleSortByPrice} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
              <label htmlFor="inline-radio" className="ml-2 text-sm font-medium text-gray-900">Low to high</label>
          </div>
          <div className="flex items-center mr-4">
              <input id="inline-2-radio" type="radio" value="highToLow" checked={selectedSort === 'highToLow'} onChange={handleSortByPrice} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
              <label htmlFor="inline-2-radio" className="ml-2 text-sm font-medium text-gray-900">High to low</label>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
        { sorteredProductsByPrice.map((product) => (
          <div key={product.id} className="max-w-sm h-96 bg-white rounded overflow-hidden shadow-lg">
            <div className='flex justify-center' style={{width: '100%', height: '60%'}}>
              <Image
                className="relative p-5"
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
              />
            </div>
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{ product.title.substring(0,25) }...</div>
              <p className='text-gray-700 text-base'>
                $ { product.price }
              </p>
            </div>
            <div className='px-6 pb-2'>
              <span className='inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{ product.category }</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
