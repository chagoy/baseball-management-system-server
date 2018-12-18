import React from 'react';
require('./loading.css');

export default function Loading(props) {
	return (
		<div className='loading-container'>
			<div className='loading'>
			  <div className='bullet'></div>
			  <div className='bullet'></div>
			  <div className='bullet'></div>
			  <div className='bullet'></div>
			</div>
	  </div>
	)
}