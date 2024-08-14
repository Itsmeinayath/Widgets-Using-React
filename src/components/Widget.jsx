import React from 'react';

function Widget({ widget, removeWidget }) {
  return (
    <div className="widget">
      <h3>{widget.name}</h3>
      <p>{widget.content}</p>
      <button onClick={removeWidget}>Remove</button>
    </div>
  );
}

export default Widget;
