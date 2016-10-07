import React, {Component, PropTypes} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import ValidateInput from '../../../server/shared/validations/events';
import { createEvent } from '../../actions/eventActions';
import { connect } from 'react-redux';

class NewEventForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isLoading: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  isValid() {
    const {errors, isValid} = ValidateInput(this.state);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true});
      this.props.createEvent(this.state).then(
        (res) => {
          this.context.router.push('/');
        },
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  render() {
    const { title, isLoading, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          field="title"
          value={title}
          label="Event Title"
          onChange={this.onChange}
          error={errors.title}
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>
            Create
          </button>
        </div>

      </form>
    );
  }
}

NewEventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
};

NewEventForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { createEvent })(NewEventForm);

