import React from 'react';
import { Link } from 'react-router-dom';

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className="margin-top-50">
          <h1 className="text-center p-4 center-hero-title">My Categories</h1>
        </div>

        <div className="container">

          <div className="row mx-auto">
            <div className="col-sm-6 mb-4">
              <input type="text" className="form-control" placeholder="Enter category name..." />
            </div>

            <div className="col-sm-2">
              <input type="submit" value="Add" className="btn btn-primary btn-primary-color" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-5">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h1 className="card-text">BREAKFAST</h1>
                  <hr />
                  <Link to="/category/breakfast" className="btn btn-primary btn-primary-color mr-2">View</Link>
                  <a href="#" className="btn btn-danger">Delete</a>
                </div>
              </div>
            </div>


            <div className="col-md-4 mb-5">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h1 className="card-text">BREAKFAST</h1>
                  <hr />
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-5">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h1 className="card-text">BREAKFAST</h1>
                  <hr />
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default CategoriesPage;
