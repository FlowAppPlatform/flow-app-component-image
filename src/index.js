import React from 'react';

import AppComponent from 'flow-app-component';

// Image Canvas Styles
import './style.css';

class ImageComponent extends AppComponent {
  constructor() {
    super();
    const newState = {
      properties: [
        {
          categoryName: 'General',
          categoryDescription: 'Basic settings for image.',
          properties: [
            {
              id: 'image',
              name: 'Image',
              type: 'image',
              options: {},
              data: null,
            },
            {
              id: 'percent',
              name: 'percent',
              type: 'number',
              options: {},
              data: 0,
              renderOnPropsPanel: false,
            },
          ],
        },
        {
          categoryName: 'Events',
          categoryDescription: 'Events for the image',
          properties: [
            {
              id: 'event',
              name: 'Events',
              type: 'graph',
              options: {},
              data: null,
            },
          ],
        },
      ],
      iconUrl: '/assets/images/image-component.png',
      componentType: 'image',
      category: 'Views',
      name: 'Image',
      parent: null,
      allowsChildren: false,
    };

    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
  }

  renderContent() {
    const elemProps = this.getElementProps();
    elemProps.style = Object.assign(this.getDefaultStyle() || {}, {
      backgroundImage: `url(${this.getPropertyData('image') ||
        '/assets/images/cloud.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    });
    return <div className="node image" {...elemProps} />;
  }
}

export default ImageComponent;
