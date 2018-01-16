
    // this.deleteRecipe = this.deleteRecipe.bind(this);


  // deleteRecipe(e) {
  //   e.preventDefault();
  //   const { param } = this.props;

  //   return axios.delete(`/api/v1/recipes/${param}`)
  //     .then((recipeDelete) => {
  //       this.setState({ favorited: recipeDelete.response.data.message })
  //     })
  //     .catch((error) => {
  //       alert(error.response.data.error);
  //       this.setState({ errors: error })
  //     })
  // }