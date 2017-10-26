import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../../components/navigation/Header';
import Footer from '../navigation/Footer';
import noodles from '../../assets/img/noodles.jpg';
import RecipeDetails from './RecipeDetails'; 

class RecipeDetailsPage extends Component {
  render(){
    return (
      <div>
      {/* Header component for navigation */}
        <Header />

        <RecipeDetails />

        <div className="clearfix m-5"/>

        {/* Display footer */}
        <Footer/>

      </div>
    )
  }
}

export default RecipeDetailsPage;

