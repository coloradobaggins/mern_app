import { Landing, Register, Error} from './pages';
import { AddOperation, AllOperations, Profile, SharedLayout, Stats } from './pages/dashboard/';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <SharedLayout /> } >
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
