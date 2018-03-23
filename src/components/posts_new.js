import React, { Component } from "react";
// Redux form is all about handling any type of form u have with redux
// validating the input and submitting the form in some fashion
import { Field, reduxForm } from "redux-form"; // helpers from redux-form library
// Field - react component, wired up automatically to redux form
// reduxForm - a function, similar to connect helper from react-redux
// a. this is what allows the reduxForm to contact with the formReducer
// b. what allows our component to directly talk to the redux store

//why are we using redux form?
// 1. Identify different pieces of form state - A field component is a piece of state
// 2. Make one 'Field' component per piece of state
// 3. User changes a 'Field' input
// 4. Redux form automatically handles changes
// 5. User submits form
// 6. We validate inputs and handle form submittal

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
  //returns some JSX, but we need to wire up the JSX to the field component
  //uses argument 'field' - contains some event handlers we need to wire up to the JSX
  // we are returning
  renderField(field) {
    // field arguement lets the <Field> component know that it is responsible for it
    // it also brings in event handlers to let it know
    // field.meta.touched and field.meta.error lets you know the status of the form
    // const { meta: { touched, error } } = field;
    // const {meta: {touched, error}} = field;
    const {touched, error} = field.meta;
    // use ternary operator for classname to make input red outline dynamic
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    // same thing as className = `form-group ${field.meta.touched && field.meta.error ? has-danger : ""}`

    return (
      <div className={className}>
        {/* title label */}
        <label>{field.label}</label>
        {/*{...field.input} - is an object which contains a bunch of event handlers and props  */}
        {/*like on change, onblur, on focus  */}
        {/*2.a by doing '...' we are just passing the props from field.input  */}
        {/*... says this is an object and I want all of the props of field.input to be put  */}
        {/* into this field tag */}
        {/* similar to onChange={field.input.onChange}
          onBlur={field.input.onFocus}
         */}
        <input className="form-control" type="text" {...field.input} />
        {/*type='text', deliberatly says this is a text input  */}
        <div className="text-help">
        {/*text-help makes the text red  */}
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  // on submit receives object called values
  // this values object contains the values from our Fields
  onSubmit(values) {
    // first argument are the values we submit
    // second argument is the call back, second part of the call back is in the action creator
    this.props.createPost(values, () => {
      // programmatic navigation - automatically navigate our user
      // this says to go back to our / root route
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      //helper function
      // when you click on submit, redux form will:
      // 1. validate first to make sure everythings ok
      // 2. calls the onsubmit function
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Post"
          // name property and the values.name need to be the same in the validation
          name="title"
          // supposed to be a function that returns some amount of JSX
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        {/*Link to go back to homepage  */}
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// helper function to validate,
// 1. pass into reduxForm helper as a configuration option
// 2. since key and function same name u can pass it as 'validate'
// 3. This function will be called if submitted or press Enter
// 4. This function accepts an object called values
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  // the helper function below
  validate,
  // form propety: the name of the form
  // a. inside any given react or redux app, u may want multiple forms on a page
  // b. only has to be unique
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));
