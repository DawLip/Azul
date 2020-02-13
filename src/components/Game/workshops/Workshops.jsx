import React from 'react';

import { connect } from 'react-redux';
import { chooseWorkshop, chooseSquareToCollectS, chooseSquareToCollectW } from '../../../actions';

import './workshops.sass';

class Workshops extends React.Component {
  render() {
    const { players, workshopsColor, rejectedSquares } = this.props.gameData;
    const numOfWorkshops = 1 + players.length * 2;

    return (
      <>
        <section className="workshops">
          <div className="workshops__wrap">
            <div className="workshops__workshopGroup">
              {(() => {
                const workshops = [];
                for (let i = 0; i < (numOfWorkshops - 1) / 2; i++) {
                  workshops.push(
                    <div
                      onClick={() => this.props.chooseWorkshop(i)}
                      className="workshops__workshop"
                    >
                      <div
                        className={`workshops__color 
							${workshopsColor[i][0] ? `workshops__color--${workshopsColor[i][0]}` : ''}`}
                      ></div>
                      <div
                        className={`workshops__color 
							${workshopsColor[i][1] ? `workshops__color--${workshopsColor[i][1]}` : ''}`}
                      ></div>
                      <div
                        className={`workshops__color ${
                          workshopsColor[i][2] ? `workshops__color--${workshopsColor[i][2]}` : ''
                        }`}
                      ></div>
                      <div
                        className={`workshops__color ${
                          workshopsColor[i][3] ? `workshops__color--${workshopsColor[i][3]}` : ''
                        }`}
                      ></div>
                    </div>
                  );
                }
                return workshops;
              })()}
            </div>

            <div className="workshops__workshopGroup">
              {(() => {
                const workshops = [];
                for (let i = (numOfWorkshops - 1) / 2; i < numOfWorkshops - 1; i++) {
                  workshops.push(
                    <div
                      onClick={() => this.props.chooseWorkshop(i)}
                      className="workshops__workshop"
                    >
                      <div
                        className={`workshops__color 
							${workshopsColor[i][0] ? `workshops__color--${workshopsColor[i][0]}` : ''}`}
                      ></div>
                      <div
                        className={`workshops__color 
							${workshopsColor[i][1] ? `workshops__color--${workshopsColor[i][1]}` : ''}`}
                      ></div>
                      <div
                        className={`workshops__color ${
                          workshopsColor[i][2] ? `workshops__color--${workshopsColor[i][2]}` : ''
                        }`}
                      ></div>
                      <div
                        className={`workshops__color ${
                          workshopsColor[i][3] ? `workshops__color--${workshopsColor[i][3]}` : ''
                        }`}
                      ></div>
                    </div>
                  );
                }
                return workshops;
              })()}
            </div>
          </div>

          <div className="workshops__rejected">
            <div className="workshops__rejectedGroup">
              <div
                className={`workshops__rejectedSquare ${
                  rejectedSquares.blue ? `workshops__color--blue` : ''
                }`}
                onClick={() => this.props.chooseSquareToCollectS('blue')}
              >
                {rejectedSquares.blue ? rejectedSquares.blue : ''}
              </div>
              <div
                className={`workshops__rejectedSquare ${
                  rejectedSquares.yellow ? `workshops__color--yellow` : ''
                }`}
                onClick={() => this.props.chooseSquareToCollectS('yellow')}
              >
                {rejectedSquares.yellow ? rejectedSquares.yellow : ''}
              </div>
              <div
                className={`workshops__rejectedSquare ${
                  rejectedSquares.red ? `workshops__color--red` : ''
                }`}
                onClick={() => this.props.chooseSquareToCollectS('red')}
              >
                {rejectedSquares.red ? rejectedSquares.red : ''}
              </div>
            </div>

            <div className="workshops__workshopLarge">
              <div
                onClick={() =>
                  this.props.chooseSquareToCollectW(workshopsColor[numOfWorkshops - 1][0])
                }
                className={`workshops__color ${
                  workshopsColor[numOfWorkshops - 1][0]
                    ? `workshops__color--${workshopsColor[numOfWorkshops - 1][0]}`
                    : ''
                }`}
              ></div>
              <div
                onClick={() =>
                  this.props.chooseSquareToCollectW(workshopsColor[numOfWorkshops - 1][1])
                }
                className={`workshops__color ${
                  workshopsColor[numOfWorkshops - 1][1]
                    ? `workshops__color--${workshopsColor[numOfWorkshops - 1][1]}`
                    : ''
                }`}
              ></div>
              <div
                onClick={() =>
                  this.props.chooseSquareToCollectW(workshopsColor[numOfWorkshops - 1][2])
                }
                className={`workshops__color ${
                  workshopsColor[numOfWorkshops - 1][2]
                    ? `workshops__color--${workshopsColor[numOfWorkshops - 1][2]}`
                    : ''
                }`}
              ></div>
              <div
                onClick={() =>
                  this.props.chooseSquareToCollectW(workshopsColor[numOfWorkshops - 1][3])
                }
                className={`workshops__color ${
                  workshopsColor[numOfWorkshops - 1][3]
                    ? `workshops__color--${workshopsColor[numOfWorkshops - 1][3]}`
                    : ''
                }`}
              ></div>
            </div>

            <div className="workshops__rejectedGroup">
              <div
                className={`workshops__rejectedSquare ${
                  rejectedSquares.black ? `workshops__color--black` : ''
                }`}
                onClick={() => this.props.chooseSquareToCollectS('black')}
              >
                {rejectedSquares.black ? rejectedSquares.black : ''}
              </div>
              <div
                className={`workshops__rejectedSquare ${
                  rejectedSquares.white ? `workshops__color--white` : ''
                }`}
                onClick={() => this.props.chooseSquareToCollectS('white')}
              >
                {rejectedSquares.white ? rejectedSquares.white : ''}
              </div>
              {/* <div
					className={`workshops__rejectedSquare ${
					  rejectedSquares[5].number ? `workshops__color--${rejectedSquares[5].color}` : ''
					}`}
				  >
					{rejectedSquares[5].number ? rejectedSquares[5].number : ''}
				  </div> */}
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { chooseWorkshop, chooseSquareToCollectS, chooseSquareToCollectW };

export default connect(mapStateToProps, mapDispatchToProps)(Workshops);
