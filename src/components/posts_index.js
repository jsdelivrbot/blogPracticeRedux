import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";

// Nearly identical the classic <a> tag
// Difference between Link and an <a> tag is that it prevents certain default events that an <a> tag has
// like refreshing the browser for an html request
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions";

class PostsIndex extends Component {
  // Lifecycle method, called automatically by react
  componentDidMount() {
    console.log('posts', this.props.posts);
    this.props.fetchPosts();
  }

  renderPosts() {
    console.log(this.props);
    // we use lodash here because the posts are no longer part of an array but are keys to an object
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        {/*text-xs-right this moves the button to the right side  */}
        <div className="text-xs-right">
          {/*Link component acts like <a> tag here  */}
          {/*when we want to send the user to the /posts/new form we use the 'to'  */}
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {/*helper function to render the posts  */}
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// always hook up for state -> props
function mapStateToProps(state) {
  console.log('state', state);
  return { posts: state.posts };
}


// { fetchPosts } -> this is similar to the mapping function, but allows react-redux to that for us
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
