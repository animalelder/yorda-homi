import React, { useState } from "react";
import axios from "axios";

export default function PropertySearch({ setProperties }) {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    bedroomCount: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/properties/search", {
        params: filters,
      });
      setProperties(response.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 rounded"
          value={filters.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          className="border p-2 rounded"
          value={filters.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={filters.maxPrice}
          onChange={handleChange}
        />
        <select
          name="propertyType"
          className="border p-2 rounded"
          value={filters.propertyType}
          onChange={handleChange}
        >
          <option value="">Property Type</option>
          <option value="CONDO">Condo</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="STUDIO">Studio</option>
        </select>
        <input
          type="number"
          name="bedroomCount"
          placeholder="Bedrooms"
          className="border p-2 rounded"
          value={filters.bedroomCount}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Search
      </button>
    </form>
  );
}
