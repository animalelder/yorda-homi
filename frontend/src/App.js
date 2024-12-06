


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
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Icon Container for Top-Left Position */}
      <div className="icon-container">
        <FontAwesomeIcon icon={faHouse} style={{ marginRight: '10px', color: 'Orange' }} />
        <span>Homi</span> {/* Text next to the icon */}
      </div>
      <header className="App-header">
        <h1>Welcome to Homi</h1>
        
      </header>
    </div>
  );
}

export default App;

