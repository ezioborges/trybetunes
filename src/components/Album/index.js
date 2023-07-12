import React from 'react';
import Header from '../Hearder';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../MusicCard';
import './index.css';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      musics: [],
    };
  }

  async componentDidMount() {
    this.getMusicsAlbum();
  }

  getMusicsAlbum = async () => {
    // eslint-disable-next-line react/prop-types
    const { match: { params: { id } } } = this.props;
    const albumMusics = await getMusics(id);
    this.setState({
      musics: albumMusics,
      artist: albumMusics[0],
    });
  };

  render() {
    const { artist, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="page-album">
          <div className="info-content">
            <img src={ artist.artworkUrl100 } alt="Foto de capa do album" />
            <div className="artist-album-descrip">
              <h2 data-testid="album-name">
                {
                  artist.collectionName
                }
              </h2>
              <p
                data-testid="artist-name"
              >
                { artist.artistName }
              </p>
            </div>

          </div>
          <div className="music-card-items">
            <ul className="card-music element">
              {
                musics.slice(1).map((music, index) => (
                  <li
                    key={ index }
                  >
                    <MusicCard music={ music } />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
