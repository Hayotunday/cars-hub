'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { SearchManufacturer } from "."
import { manufacturers } from "@/constants"

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button
    type="submit" 
    className={`-ml-3 z-10 ${otherClasses}`}
  >
    <Image
      src={'/magnifying-glass.svg'}
      alt="magnifying glass"
      width={20}
      height={20}
      className="object-contain"
    />
  </button>
)

const SearchBar = ({ setManufacturer, setModel}: any) => {
  const [searchManufacturer, setSearchManufacturer] = useState('');
  const [searchModel, setSearchModel] = useState('');

  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchManufacturer === '' && searchModel === '') {
      return alert('Please fill in the search bar')
    }

    // updateSearchParams(searchModel.toLowerCase(), searchManufacturer.toLowerCase())
    setModel(searchModel)
    setManufacturer(searchManufacturer)
  }

  const searchRef = useRef()

  useEffect(() => {
    const submitForm = () => {
      if (searchManufacturer !== '' || searchModel !== '') searchRef.current.click()
    }

    submitForm()
  }, [searchManufacturer, searchModel])
  

  // const updateSearchParams = (model: string, manufacturer: string) => {
  //   const searchParams = new URLSearchParams(window.location.search)

  //   if (model) {
  //     searchParams.set('model', model)
  //   } else {
  //     searchParams.delete('model')
  //   }

  //   if (manufacturer) {
  //     searchParams.set('manufacturer', manufacturer)
  //   } else {
  //     searchParams.delete('manufacturer')
  //   }

  //   const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  //   router.push(newPathname)
  // }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          selected={searchManufacturer} 
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className="searchbar__item">
        <Image
          src={'/model-icon.png'}
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text" 
          name="model" 
          value={searchModel} 
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
      <input type="submit" style={{ display: 'none' }} ref={searchRef} />
    </form>
  )
}

export default SearchBar