"use client";
import React, { useEffect, useState } from 'react';

const CountryLookup = () => {
  const [country, setCountry] = useState("United States");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`http://api.ipstack.com/check?access_key=${process.env.NEXT_PUBLIC_access_key}`);
        const data = await response.json();
        setCountry(data.country_name);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountry();
  }, []);
  return <div>{country}</div>;
}

export default CountryLookup;
