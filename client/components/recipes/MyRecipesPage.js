import React from 'react';
import axios from 'axios';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import MyRecipesDetail from './MyRecipesDetail';

class MyRecipesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      errors: {},
      favoriteCount: 0,
      cloudinaryRecipeImage: ''
    }; // Initialize the state
  }

  /**
   *  GET all recipes for authenticated user using API endpoint
   */
  componentWillMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
    axios.get('/api/v1/recipes/get_all_for_user')
    .then((recipe) => {
      console.log(recipe.data);
      this.setState({ details: recipe.data })
    })
    .catch((error) => {
      console.log(error.data);
      this.setState({ errors: error.response })
    })
  }

  render() {
    const { isLoading, favoriteCount } = this.state;
    
    /**
     * Display loading text while fetching the recipes
     */
    if (isLoading) {
      return (
        <h2 className="text-center">Loading...</h2>
      );
    }

    return (
      <div>
        {/* Display page Header */}
        <Header />

        <div className="container margin-top-70">

          <div>
              <h1 className="text-center p-4 center-hero-title">My Recipes</h1>
          </div>

          <div className="margin-top-50 margin-bottom-50"/>

          {/* <div className="card-deck mb-5"> */}
          <div className="row">
          {Object
            .keys(this.state.details.recipes)
            .map(key => <MyRecipesDetail key={key} details={this.state.details.recipes[key]} />)  
          }

          </div>
{/* 
          <div className="card-deck mb-5">
              <div className="card mt-1">
                  <img className="card-img-top" src="./img/noodles.jpg" alt="Card image cap" />
                  <div className="card-body">
                      <h4 className="card-title favorite-recipe-title"><strong>Party Jollof Rice</strong></h4>
                      <p className="card-text recipe-font-family">This is a with supporting text below as a natural lead-in to additional content. This content is a little bit longer...</p>
                      <div className="card-footer custom-card-footer-bg">
                          <p className="card-text"><small className="text-muted">30 views . 20 votes . 42 reviews</small></p>
                          <a href="#" className="btn btn-primary btn-primary-color">View Recipe</a>
                      </div>
                  </div>
              </div>
              <div className="card mt-1">
                  <img className="card-img-top" src="./img/noodles.jpg" alt="Card image cap" />
                  <div className="card-body">
                      <h4 className="card-title favorite-recipe-title"><strong>Party Jollof Rice</strong></h4>
                      <p className="card-text recipe-font-family">This is a with supporting text below as a natural lead-in to additional content. This content is a little bit longer...</p>
                      <div className="card-footer custom-card-footer-bg">
                          <p className="card-text"><small className="text-muted">30 views . 20 votes . 42 reviews</small></p>
                          <a href="#" className="btn btn-primary btn-primary-color">View Recipe</a>
                      </div>
                  </div>
              </div>

              <div className="card mt-1">
                  <img className="card-img-top" src="./img/noodles.jpg" alt="Card image cap"/>
                  <div className="card-body">
                      <h4 className="card-title favorite-recipe-title"><strong>Party Jollof Rice</strong></h4>
                      <p className="card-text recipe-font-family">This is a with supporting text below as a natural lead-in to additional content. This content is a little bit longer...</p>
                      <div className="card-footer custom-card-footer-bg">
                          <p className="card-text"><small className="text-muted">30 views . 20 votes . 42 reviews</small></p>
                          <a href="#" className="btn btn-primary btn-primary-color">View Recipe</a>
                      </div>
                  </div>
              </div>

          </div> */}

          {/* Bottom Navigation */}
          <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">Previous</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                  </li>
              </ul>
          </nav>


      </div>

        <div className="clearfix m-5"/>

        {/* Display footer */}
         <Footer />
      </div>
    );
  }
}

export default MyRecipesPage;
