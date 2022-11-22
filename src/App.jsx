import './App.css'

//Imports
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

//Components & Pages
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import AddItem from './pages/AddItem'
import ItemDetail from './pages/ItemDetail'
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

              <Route path="addItem" element={<AddItem />} />
            </Route>
            
          </Routes>
        </div>

      </QueryClientProvider>
    </div>
  );
}

export default App;

//<Route path=":id" element={<ItemDetail />} />
//<Route path="*" element={<PageNotFound />} />
