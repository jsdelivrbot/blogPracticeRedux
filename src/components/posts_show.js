import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
  componentDidMount() {
    // to get access to the URL, we access an object that is provided from react-router
    // match is the top level property
    // params object holds the wild card tokens
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    console.log('post', this.props);
  }

  onDeleteClick() {
    // how we pass thru the ID
    const { id } = this.props.match.params;

    // we use an action creator here because we are making a network request
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;
    console.log(post);

    //  data is not there yet when first renders
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// destructoring that takes in only the posts object from the state
// to get access to the URL, we access an object that is provided from react-router
// second argument by convention is ownProps - props object that is headed by this component
function mapStateToProps(state, ownProps) {
  console.log('state in mapstatetoprops', state);
  return { post: state.posts[ownProps.match.params.id]};
  // return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
