import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../../services/userAPI';
import './index.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const person = await getUser();

    this.setState({
      user: person.name,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    const loading = <h3>Carregando...</h3>;
    return (
      <header data-testid="header-component">
        <div
          data-testid="header-user-name"
          className="header-items"
        >
          <div>
            {
              isLoading ? loading : (
                <h3>{user}</h3>
              )
            }
          </div>
          <div>
            <Link
              to="/search"
              className="link-items"
              data-testid="link-to-search"
            >
              Search
            </Link>
            <Link
              to="/favorites"
              className="link-items"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
            <Link
              to="/profile"
              className="link-items"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
