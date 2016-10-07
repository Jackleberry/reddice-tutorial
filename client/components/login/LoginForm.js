import React, { Component, PropTypes } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import ValidateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';
import { login } from '../../actions/loginActions';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = ValidateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => {
          this.props.addFlashMessage({
            type: "success",
            text: "You have logged in successfully!"
          });
          this.context.router.push('/');
        },
        ({ data }) => this.setState({ errors: data.errors, isLoading: false})
      );
    }
  }

  render() {
    const { identifier, password, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{ errors.form }</div> }

        <TextFieldGroup
          field="identifier"
          value={identifier}
          label="Username / Email"
          onChange={this.onChange}
          error={errors.identifier}
        />

        <TextFieldGroup
          field="password"
          value={password}
          label="Password"
          onChange={this.onChange}
          error={errors.password}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>
            Login
          </button>
        </div>

      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login, addFlashMessage })(LoginForm);
