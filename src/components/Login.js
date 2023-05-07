import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      desabledButton: true,
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const { name } = this.state;
    const MIN_LETTER = 3;
    if (name.length >= MIN_LETTER) {
      return this.setState({ desabledButton: false });
    }
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { name, desabledButton, isLoading } = this.state;
    const loading = <Loading />;
    return (
      isLoading ? loading : (
        <div data-testid="page-login">
          <p>Login</p>
          <label htmlFor="name">
            <input
              data-testid="login-name-input"
              name="name"
              type="text"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            className="btn"
            disabled={ desabledButton }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>)
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
