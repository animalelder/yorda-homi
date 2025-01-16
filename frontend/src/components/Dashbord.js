

import React, { useState, useEffect } from "react";
import PropertySearch from "./PropertySearch";
import PropertyListing from "./PropertyListing";
import axios from "axios";

export default function Dashboard({ userRole }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const endpoint = userRole === "landlord" ? "/api/properties" : "/api/properties/search";
        const response = await axios.get(endpoint);
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, [userRole]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        {userRole === "landlord" ? "Landlord Dashboard" : "Tenant Dashboard"}
      </h1>

      {userRole === "tenant" && <PropertySearch setProperties={setProperties} />}
      <PropertyListing properties={properties} userRole={userRole} />
    </div>
  );
}
