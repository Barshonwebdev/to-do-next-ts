"use client";

import React, { useEffect, useState } from "react";
import { readTypes } from "./action";
type Types = {
  _id: string;
  name: string;
  main_ingredients: [];
  country_of_origin: string;
  flavor: string;
  price: number;
  vegetarian: boolean;
};
const typePrac = () => {
  const [allData, setAllData] = useState<Types[]>([]);
  useEffect(() => {
    async function fetchTypes() {
      const data = await readTypes();
      setAllData(data);
    }
    fetchTypes();
  }, []);

  return (
    <div>
      <p className="my-4 text-center text-4xl text-green-500">
        TypeScript Practice
      </p>
      <div className="m-5 grid grid-cols-3 gap-5">
        {allData.map((type) => (
          <div className="bg-blue-400 p-5 rounded-lg text-white font-bold text-lg" key={type._id}>
            <p className="text-3xl mb-5">Item Name:{type.name}</p>
            <p>Origin:{type.country_of_origin}</p>
            <p>
              Ingredients:{" "}
              {type.main_ingredients.map((ingredient, index) => (
                <span key={index}>{ingredient},</span>
              ))}
            </p>
            <p>Flavor: {type.flavor}</p>
            <p>Price:{type.price} taka only</p>
            {type.vegetarian ? <p>Vegetarian: Yes</p> : <p>Vegetarian: No</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default typePrac;
