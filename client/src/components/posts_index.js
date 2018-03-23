import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from '../actions/index';
import { fetchFood } from '../actions/index';

class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }
  componentDidMount(props) {
    // this.props.List();
    // console.log(this.props.list);
    console.log(this.props.list)

  }

  renderBooks = () => {
    if (!this.props.list) {
      return null
    }

    return <div>{this.props.list.foo}{this.props.list.test}{this.props.list.food}</div>
  }

  change = (event) => {
    this.setState({
      value:event.target.value
    })
    console.log(this.state);
  }

  giveFood = (event) => {
    this.props.fetchFood(this.state.value);
  }


  render() {
    return (
      <div>
        Hi there {this.props.list.list}
        <button onClick={() => this.props.List()}>hi</button>
        <button onClick={() => console.log(this.props.list)}>state</button>
        {this.renderBooks()}
        <input onChange={this.change}/>
        <button onClick={this.giveFood}>Give food</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.list
  }
}


// export default PostsIndex;
export default connect(mapStateToProps, { List, fetchFood })(PostsIndex);
