import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../../components/navigation/Header';
import Footer from '../navigation/Footer';
import RecipeDetails from './RecipeDetails';

class RecipeDetailsPage extends Component {
 
  render(){
  const paramId = this.props.match.params.id;
    return (
      <div>
      {/* Header component for navigation */}
        <Header />

        <RecipeDetails param={paramId} />

        <div className="clearfix m-5"/>

        {/* Display footer */}
        <Footer/>

      </div>
    )
  }
}

export default RecipeDetailsPage;

