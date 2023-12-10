import { Routes, Route, Navigate } from 'react-router-dom';

import BoardPage from './pages/boardPage/BoardPage';
import ViewBoardPage from './pages/viewBoardPage/ViewBoardPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="boards" element={<BoardPage />} />
        <Route path="boards/:id" element={<ViewBoardPage />} />
        <Route path="/" element={<Navigate to={'/boards'} />} />
      </Routes>
    </>
  );
}

export default App;
