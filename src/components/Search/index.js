import React from 'react';
import Header from '../Hearder';
import './index.css';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumCard from '../AlbumCard';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      disabledButton: true,
      isLoading: false,
      allAlbums: [],
      selectedArtist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  handleClick = async () => {
    const { artist } = this.state;

    this.setState({
      isLoading: true,
    });

    const searchAlbuns = await searchAlbumsAPI(artist);

    this.setState({
      artist: '',
      isLoading: false,
      allAlbums: searchAlbuns,
    }, () => this.getNameArtisit());
  };

  handleKeyUp = (event) => {
    if (event.key === 'Enter') this.handleClick();
  };

  getNameArtisit = () => {
    const { allAlbums } = this.state;

    const nameArtist = allAlbums.find((artist) => artist);

    if (nameArtist) {
      return this.setState({
        selectedArtist: `Resultado de álbuns de: ${nameArtist.artistName}`,
      });
    }
    return this.setState({ selectedArtist: 'Nenhum álbum foi encontrado' });
  };

  enableButton = () => {
    const { artist } = this.state;

    const MIN_LETTER = 2;

    if (artist.length >= MIN_LETTER) this.setState({ disabledButton: false });
  };

  render() {
    const {
      artist,
      disabledButton,
      isLoading,
      allAlbums,
      selectedArtist,
    } = this.state;
    const loading = <h3>Carregando...</h3>;
    return (
      <div
        data-testid="page-search"
        className="page-search"
      >
        <Header />
        <div className="search">
          <div className="search-items">
            <label htmlFor="artist">
              <input
                data-testid="search-artist-input"
                name="artist"
                value={ artist }
                className="form-control"
                placeholder="Nome do artista"
                onChange={ this.handleChange }
                onKeyUp={ this.handleKeyUp }
              />
            </label>
            <button
              className="btn btn-color m-2"
              data-testid="search-artist-button"
              disabled={ disabledButton }
              type="button"
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </div>
        </div>
        <div className="load">
          {
            isLoading ? loading : (
              <div className="result">
                <p>{selectedArtist}</p>
                <AlbumCard allAlbums={ allAlbums } />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
