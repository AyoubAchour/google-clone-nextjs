"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';

export default function HomeSearch() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const [randomSearchLoading, setRandomSearchLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/web?searchTerm=${input}`);
  }

  async function randomSearch() {
    setRandomSearchLoading(true);
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word').then((res) => res.json());
      const randomWord = response[0];
      if (!randomWord) return;
      router.push(`/search/web?searchTerm=${randomWord}`);
    } catch (error) {
      console.error('Error occurred during random search:', error);
    } finally {
      setRandomSearchLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md focus-within:shadow-md transition-shadow sm:max-w-xl lg:max-w-2xl">
        <AiOutlineSearch className="text-xl text-gray-500 mr-3" onClick={handleSubmit} />
        <input type="text" className="flex-grow focus:outline-none" onChange={(e) => setInput(e.target.value)} value={input} />
        <BsFillMicFill className="text-xl text-gray-500 mr-3" />
      </form>

      <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 justify-center sm:flex-row mt-8">
        <button className="btn" type="submit" onClick={handleSubmit}>
          Google Search
        </button>
        <button disabled={randomSearchLoading} className="btn flex items-center justify-center disabled:opacity-80" type="submit" onClick={randomSearch}>
          {randomSearchLoading ? (
            <img src="/spinner.svg" alt="Loading..." className="h-6 text-center" />
          ) : (
            'I\'m Feeling Lucky'
          )}
        </button>
      </div>
    </>
  );
}
