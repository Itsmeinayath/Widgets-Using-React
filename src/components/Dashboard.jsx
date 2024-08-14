import React, { useState } from 'react';
import Widget from './Widget';
import ChartWidget from './ChartWidget';

const initialData = {
  "CSPM Executive Dashboard": [
    { id: 1, name: 'Cloud Accounts', content: 'Total: 2', type: 'text' },
    { id: 2, name: 'Cloud Account Risk Assessment', content: 'Failed: 1689, Warning: 681, Passed: 7253', type: 'text' },
  ],
  "CWPP Dashboard": [],
  "Registry Scan": [
    { id: 3, name: 'Image Risk Assessment', data: [12, 19, 3, 5, 2, 3], chartType: 'bar', labels: ['January', 'February', 'March', 'April', 'May', 'June'], type: 'chart' },
    { id: 4, name: 'Image Security Issues', content: 'Total Images: 2', type: 'text' },
  ]
};

function Dashboard() {
  const [categories, setCategories] = useState(initialData);

  const addWidget = (categoryName) => {
    const widgetName = prompt("Enter Widget Name:");
    const widgetType = prompt("Enter Widget Type (text/chart):", "text");

    if (widgetType === 'chart') {
      const chartType = prompt("Enter Chart Type (bar/pie):", "bar");
      const labels = prompt("Enter labels (comma-separated):", "January,February,March").split(',');
      const data = prompt("Enter data (comma-separated):", "12,19,3,5,2,3").split(',').map(Number);

      const newWidget = { id: Date.now(), name: widgetName, chartType, labels, data, type: 'chart' };
      setCategories(prevCategories => ({
        ...prevCategories,
        [categoryName]: [...prevCategories[categoryName], newWidget]
      }));
    } else if (widgetType === 'text') {
      const widgetContent = prompt("Enter Widget Content:");
      const newWidget = { id: Date.now(), name: widgetName, content: widgetContent, type: 'text' };
      setCategories(prevCategories => ({
        ...prevCategories,
        [categoryName]: [...prevCategories[categoryName], newWidget]
      }));
    }
  };

  const removeWidget = (categoryName, widgetId) => {
    setCategories(prevCategories => ({
      ...prevCategories,
      [categoryName]: prevCategories[categoryName].filter(widget => widget.id !== widgetId)
    }));
  };

  return (
    <div className="dashboard">
      {Object.keys(categories).map(categoryName => (
        <div key={categoryName} className="category">
          <h2>{categoryName}</h2>
          <button onClick={() => addWidget(categoryName)}>Add Widget</button>
          <div className="widgets">
            {categories[categoryName].map(widget => (
              widget.type === 'chart' ?
                <ChartWidget key={widget.id} widget={widget} /> :
                <Widget key={widget.id} widget={widget} removeWidget={() => removeWidget(categoryName, widget.id)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
