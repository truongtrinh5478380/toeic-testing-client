import React from 'react';

const CountdownTimer = ({ countdown }) => {
	return (
		<div>
			<span>{countdown.hours}:</span>
			<span>{countdown.minutes}:</span>
			<span>{countdown.seconds}</span>
		</div>
	);
};

export default CountdownTimer;
