import React from 'react';

import { connect } from 'react-redux';

class TooManyPlayers extends React.Component {
  render() {
    return <div>Too many players</div>;
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TooManyPlayers);
