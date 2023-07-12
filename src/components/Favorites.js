import React from 'react';
import Header from './Hearder';

export default class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
      </div>
    );
  }
}
