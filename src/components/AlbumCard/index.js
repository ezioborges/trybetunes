import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import './index.css';

export default class AlbumCard extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { allAlbums } = this.props;

    return (
      <ul className="content">
        {
          // eslint-disable-next-line react/prop-types
          allAlbums.map((album) => {
            const formattedDate = moment(album.releaseDate).format('YYYY');
            return (
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
                className="items"
              >
                <li>
                  <img
                    className="img"
                    src={ album.artworkUrl100 }
                    alt="Foto de capa do album"
                  />
                  <div className="container">
                    {/* <p>{album.artistId}</p> */}
                    <p>{`Album: ${album.collectionName}`}</p>
                    <p className="line">{`Artista: ${album.artistName}`}</p>
                    {/* <p>{album.collectionId}</p> */}
                    <p>{`Lançamento: ${formattedDate}`}</p>
                    <p>{`Preço: ${album.collectionPrice}`}</p>
                    <p>{`Faixas: ${album.trackCount}`}</p>
                  </div>
                </li>
              </Link>
            );
          })
        }
      </ul>
    );
  }
}
