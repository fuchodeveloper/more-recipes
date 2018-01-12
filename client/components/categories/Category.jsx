import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import placeHolder from '../../assets/img/recipe_placeholder.png';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* Header component for navigation */}
        <Header />

        <div>
          <p className="text-center p-4">
            <input type="text" className="text-center p-4 center-hero-title-small" value="Breakfast" /><br />
            <span className="text-center">
              <input type="submit" value="Save" className="btn btn-primary btn-primary-color" />
            </span>
          </p>
        </div>

        <div className="container">
          <hr />

          <div className="float-right">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
               Add recipe
            </button>

            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">

                    <form>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Recipe</th>
                            <th scope="col">Add to category</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Jollof rice</td>
                            <td><input type="checkbox" name="" id="" /></td>
                          </tr>

                          <tr>
                            <th scope="row">2</th>
                            <td>Yam porridge</td>
                            <td><input type="checkbox" name="" id="" /></td>
                          </tr>

                        </tbody>
                      </table>
                    </form>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clearfix" />

          <div className="col-md-4 mb-2">
            <div className="card mt-1">
              <img className="card-img-top" max-width="348px" height="231px" src={placeHolder} alt="placeholder" />
              <div className="card-body">
                <h4 className="card-title">Jollof rice</h4>
                <p className="card-text">
                Peel the over ripe plantain and mash with a fork. set aside. sift half of the flour, the salt and th...
                </p>
                <div className="card-footer custom-card-footer-bg">
                  <p className="card-text"><small className="text-muted">40 <i className="fa fa-eye" aria-hidden="true" /> . 20 <i className="fa fa-thumbs-up" aria-hidden="true" /> . 10 <i className="fa fa-star" aria-hidden="true" /></small></p>
                  <Link to="/home" className="btn btn-primary btn-primary-color">View recipe </Link> &nbsp; <Link to="/home" className="btn btn-light">Remove</Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Display footer  */}
        <Footer />

      </div>
    );
  }
}

export default Category;
