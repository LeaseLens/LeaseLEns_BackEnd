// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <h1>Lease Lens</h1>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import Signup from './components/Signup';

const App: React.FC = () => {
    return (
        <div>
            <h1>Lease Lens</h1>
            <Signup />
        </div>
    );
};

export default App;
