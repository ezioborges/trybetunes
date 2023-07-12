import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './index.css';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      toggleCheck: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    // eslint-disable-next-line react/prop-types
    const { music } = this.props;

    this.setState({
      isLoading: true,
      toggleCheck: checked,
    });

    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }

    this.setState({
      isLoading: false,
      toggleCheck: checked,
    });
  };

  favoriteSongs = async () => {
    // eslint-disable-next-line react/prop-types
    const { music } = this.props;
    const favorites = await getFavoriteSongs();
    // eslint-disable-next-line react/prop-types
    const songs = favorites.find((song) => music.trackId === song.trackId);

    this.setState({
      toggleCheck: songs,
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { music } = this.props;
    // eslint-disable-next-line react/prop-types
    const { trackName } = music;

    const { toggleCheck, isLoading } = this.state;

    return (
      <div className="audio-items">
        {
          isLoading ? 'Carregando...' : (
            <>
              <div className="desc-item">
                <p>{trackName}</p>
                <audio data-testid="audio-component" src="{previewUrl}" controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
              </div>
              <label
                htmlFor="trackId"
              >
                <input
                  // eslint-disable-next-line react/prop-types
                  data-testid={ `checkbox-music-${music.trackId}` }
                  name="trackId"
                  type="checkbox"
                  checked={ toggleCheck }
                  onChange={ this.handleChange }
                />
              </label>

            </>
          )
        }
      </div>
    );
  }
}
