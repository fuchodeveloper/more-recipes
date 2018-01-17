import React from 'react';
import UpdateRecipeForm from './UpdateRecipeForm';

class UpdateRecipePage extends React.Component {
  render() {
    const paramId = this.props.match.params.id;

    return (
      <div>

        <div className="container margin-top-70">
          <div>
            <h1 className="text-center p-4 center-hero-text">Update Recipe</h1>
          </div>


          {/* Form to update recipe ingredients and quantity */}
          <div className="col-md-6 mx-auto p-3">

            <UpdateRecipeForm param={paramId} />

          </div>
        </div>

        <div className="clearfix m-5" />

      </div>
    );
  }
}

export default UpdateRecipePage;