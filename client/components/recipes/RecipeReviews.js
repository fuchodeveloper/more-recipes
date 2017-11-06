import React from 'react';
import axios from 'axios';

class RecipeReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      errors: ''
    }
  }

  /**
   * Get the username of the user who posted a review
   * 
   * @memberof RecipeReviews
   */
  componentDidMount() {
    const reviewId = this.props.details.userId;
      axios.get(`/api/v1/findUser/${reviewId}`)
        .then((user) => {
          this.setState({ userName: user.data.user })
        })
        .catch((error) => {
          this.setState({ errors: error })
        });
    }

  render() {
    
    const { details } = this.props; // Destructure details props
    const { userName } = this.state; // Destructure username

    return (
      <div>
          <span className="text-muted"><em>{userName} said:</em></span>
          <p>{details.review}</p>
      </div>
    )
  }
}

export default RecipeReviews;
