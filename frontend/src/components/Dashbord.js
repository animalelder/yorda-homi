// export default function Dashbord() {
//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Dashbord</h1>
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Welcome to Your Dashbord</h2>
//         <p className="text-gray-600">Manage your properties, messages, and account here.</p>
//       </section>
//     </div>
//   );
// }



export default function Dashboard({ userRole }) {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {userRole === "landlord" ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Landlord Dashboard</h2>
          <p>Here, you can manage your properties, view applications, and communicate with tenants.</p>
        </div>
      ) : userRole === "tenant" ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Tenant Dashboard</h2>
          <p>Here, you can browse properties, manage applications, and communicate with landlords.</p>
        </div>
      ) : (
        <p className="text-red-600">Error: Invalid user role.</p>
      )}
    </div>
  );
}
