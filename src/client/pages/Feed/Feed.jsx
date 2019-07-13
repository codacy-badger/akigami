import React, { Component } from 'react';
import range from 'lodash/range';
import sample from 'lodash/sample';
import Paper from '../../components/Paper';
import { Container } from '../../components/Grid';
import ResponsiveReverseGrid from '../../components/ResponsiveReverseGrid';
import AnimeCard from '../../components/AnimeCard';
import { animes } from '../mock';
import Glide from '../../components/Glide/Glide';

class Feed extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <h1 className="no-mr">Сейчас в эфире</h1>
        </Container>
        <Glide
          horizontalScroll
          ItemComponent={AnimeCard}
          items={range(20).map(e => ({ ...animes[sample(range(5))], id: e }))}
        />
        <Container>
          <ResponsiveReverseGrid
            reverse
            left={(
              <Paper>
                Left block
              </Paper>
            )}
            center={(
              <Paper>
                <div style={{ fontSize: 24, lineHeight: 4 }}>
                  <div style={{ fontWeight: 300 }}>Проверка шрифта 300 / Test font 300 Light</div>
                  <div style={{ fontWeight: 400 }}>Проверка шрифта 400 / Test font 400 Book</div>
                  <div style={{ fontWeight: 500 }}>Проверка шрифта 500 / Test font 500 Medium</div>
                  <div style={{ fontWeight: 600 }}>Проверка шрифта 600 / Test font 600 Demi</div>
                  <div style={{ fontWeight: 700 }}>Проверка шрифта 700 / Test font 700 Heavy</div>
                  <div style={{ fontWeight: 800 }}>Проверка шрифта 800 / Test font 800 Bold</div>
                  <div style={{ fontWeight: 900 }}>Проверка шрифта 900 / Test font 900 Extra Bold</div>
                </div>
              </Paper>
            )}
            right={(
              <Paper>
                Right block
              </Paper>
            )}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default Feed;
