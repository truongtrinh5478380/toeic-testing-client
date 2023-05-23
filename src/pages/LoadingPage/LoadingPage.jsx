import React from 'react';
import './LoadingPage.scss';

const Loading = () => {
	return (
		<div className="loading-container">
			<div className="loading-animation"></div>
			<div className="loading-text">Loading...</div>
		</div>
	);
};

export default Loading;
