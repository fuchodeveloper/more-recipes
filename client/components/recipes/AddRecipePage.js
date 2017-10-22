import React from 'react';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import AddRecipeForm from './AddRecipeForm';

class AddRecipePage extends React.Component {
  render() {
    return (
      <div>
        {/* Header component for navigation */}
        <Header />

        <div className="container margin-top-70">
        <div>
            <h1 className="text-center p-4 center-hero-text">Add Recipe</h1>
        </div>

        {/* Recipe avatar */}
        <div className="col-md-6 mx-auto p-3 add_recipe-card text-center">
            <img src="./img/no-image.svg" width="350px" id="recipe-image-avatar" height="auto" className="img-fluid" alt=""/>
        </div>

        {/* Form to add recipe ingredients and quantity */}
        <div className="col-md-6 mx-auto p-3">
          
          <AddRecipeForm />

        </div>
    </div>

    <div className="clearfix m-5"/>

    <Footer />

  </div>
    );
  }
}

export default AddRecipePage;
