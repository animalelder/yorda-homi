import React from "react";

export default function PropertyListing({ properties, userRole }) {
  if (properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="border p-4 rounded shadow">
          <img
            src={property.photos ? JSON.parse(property.photos)[0] : "/default-property.jpg"}
            alt={property.title}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <p>{property.description}</p>
          <p>Price: ${property.price}</p>
          <p>Location: {property.location}</p>
          <p>Bedrooms: {property.bedroom_count}</p>
          {userRole === "landlord" && (
            <div className="mt-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
