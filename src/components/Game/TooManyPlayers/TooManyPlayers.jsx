import React from 'react';

import { connect } from 'react-redux';

import './tooManyPlayers.sass';

class TooManyPlayers extends React.Component {
  render() {
    return (
      <>
        <div className="tooManyPlayers">
          <div className="tooManyPlayers__top">
            <i class="fas fa-user tooManyPlayers__icon"></i>
            <i class="fas fa-user tooManyPlayers__icon"></i>
            <p className="tooManyPlayers__text">Too many players</p>
            <i class="fas fa-user tooManyPlayers__icon"></i>
            <i class="fas fa-user tooManyPlayers__icon"></i>
          </div>
          <i class="fas fa-user-slash tooManyPlayers__bootomIcon"></i>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TooManyPlayers);
