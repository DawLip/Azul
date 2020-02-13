import React from 'react';

import { connect } from 'react-redux';
// import { createPawns, playerMove, selectPawn, checkMoveOption } from '../../actions';

import './rotateWarning.sass';

class RotateWarning extends React.Component {
	render() {
		return (
			<div className="rotateWarning">
				<div className="rotateWarningContainer">
					<p className="rotateWarning__text">Rotate your device</p>
					<div className="rotateWarning__iconContainer">
						<i className="rotateWarning__icon fas fa-sync-alt"></i>
						<i className="rotateWarning__icon fas fa-mobile-alt"></i>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RotateWarning);
