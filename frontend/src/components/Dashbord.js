import React, { useState } from 'react';
import PropertyListing from './PropertyListing';
import PropertySearch from './PropertySearch';

export default function Dashbord({ userRole }) {
  const [properties, setProperties] = useState([]);

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     try {
  //       const endpoint = userRole === "landlord" ? "/api/properties" : "/api/properties/search";
  //       const response = await axios.get(endpoint);
  //       setProperties(response.data);
  //     } catch (err) {
  //       console.error("Error fetching properties:", err);
  //     }
  //   };

  //   fetchProperties();
  // }, [userRole]);

  return (
    <div className='min-h-screen p-8 bg-gray-100'>
      <h1 className='mb-6 text-3xl font-bold'>{userRole === 'landlord' ? 'Landlord Dashboard' : 'Tenant Dashboard'}</h1>

      {userRole === 'tenant' && <PropertySearch setProperties={setProperties} />}
      <PropertyListing properties={properties} userRole={userRole} />
    </div>
  );
}
