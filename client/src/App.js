import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute} from './pages';
import { AddOperation, AllOperations, Profile, SharedPage, Stats } from './pages/dashboard/';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <SharedPage /> 
            </ProtectedRoute>
          } 
        >
          <Route index element={ <Stats />} />
          <Route path="all-operations" element={ <AllOperations />} />
          <Route path="add-operation" element={ <AddOperation /> } />
          <Route path="profile" element={ <Profile /> } />
        </Route>
        <Route path="/register" element={ <Register /> } />
        <Route path="/landing" element={ <Landing /> } />
        <Route path="*" element={ <Error /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
