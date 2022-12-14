import './App.css'

//Imports
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

//Components & Pages
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Portfolio from './pages/Portfolio/Portfolio'
import AddItem from './pages/AddItem/AddItem'
import ItemDetail from './pages/ItemDetail/ItemDetail'
import PageNotFound from './pages/PageNotFound'

const queryClient = new QueryClient()

function App() {

  //JSX
  return (

    <div>
      <QueryClientProvider client={queryClient}>

        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio">
              <Route path="" element={<Portfolio />} />
              <Route path=":itemID" element={<ItemDetail />} />
              <Route path="addItem" element={<AddItem />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

      </QueryClientProvider>
    </div>
  );
}

export default App;

