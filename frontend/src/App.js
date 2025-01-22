


// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse } from '@fortawesome/free-solid-svg-icons';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* Add Font Awesome Icon */}
//         <h1>
//           <FontAwesomeIcon icon={faHouse} style={{ marginRight: '10px', color: '#00796B' }} />
//           Welcome to My Project
//         </h1>
//         <p>Building visually appealing and centralized content is easy!</p>
//       </header>
//     </div>
//   );
// }

// export default App;



// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse } from '@fortawesome/free-solid-svg-icons';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       {/* Icon Container with Inline Style */}
//       <div
//         className="icon-container"
//         style={{ color: 'green', position: 'absolute', top: '10px', right: '10px', fontSize: '24px' }}
//       >
//         <FontAwesomeIcon icon={faHouse} />
//       </div>
//       <header className="App-header">
//         <h1>Welcome to My Project</h1>
//         <p>Building visually appealing and centralized content is easy!</p>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Routes,Route } from 'react-router-dom';
import Home from '../src/Pages/Home'
import Profile from './Pages/Profile';
import ProfileCreation from './Pages/ProfileCreation';
import Property from './Pages/Property';


function App() {
  return (
    <div className="">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-profile" element={<ProfileCreation />} />
      <Route path="/property" element={<Property />} />
      </Routes>  

    </div>
  );
}

export default App;

