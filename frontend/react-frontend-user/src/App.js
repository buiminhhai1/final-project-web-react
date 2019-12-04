import React from 'react';
import './App.css';
import NavBar from './components/navigation_bar/navigationBar';
import CategoriesNavBar from './components/categories_navigation_bar/categoriesNavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <CategoriesNavBar />
    </div>
  );
}

export default App;
