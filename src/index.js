import React from 'react';

import AppComponent from 'flow-app-component';

// Image Canvas Styles
import './style.css';

// Programmatically generated styles
import {
  alignContainer,
  containerWidth,
  displayType,
  alignVertical
} from './style';

class ImageComponent extends AppComponent {
  constructor() {
    super();
    const newState = {
      properties: [{
          categoryName: 'General',
          categoryDescription: 'Basic settings for image.',
          properties: [{
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
            {
              id: 'align-container',
              name: 'Align Container',
              type: 'position', 
              options: ['left', 'center', 'right'],
              data: null,
            },
            {
              id: 'container-width',
              name: 'Width',
              type: 'dropdown',
              options: {
                options: [
                  { label: '10%', value: 'ten' },
                  { label: '20%', value: 'twenty' },
                  { label: '30%', value: 'thirty'},
                  { label: '40%', value: 'forty' },
                  { label: '50%', value: 'fifty' },
                  { label: '60%', value: 'sixty'},
                  { label: '70%', value: 'seventy' },
                  { label: '80%', value: 'eighty' },
                  { label: '90%', value: 'ninety'},
                  { label: '100%', value: 'full-page'}
                ]
              },
              data: null,
            },
            {
              id: 'vertical-align',
              name: 'Vertical Align',
              type: 'dropdown',
              options: {
                options: [
                  { label: 'Top', value: 'top' },
                  { label: 'Middle', value: 'middle' },
                  { label: 'Bottom', value: 'bottom' },
                ]
              },
              data: null
            },
          ],
        },
        {
          categoryName: 'Events',
          categoryDescription: 'Events for the image',
          properties: [{
              id: 'load',
              name: 'Load Event',
              type: 'graph',
              options: {},
              data: null,
            },
            {
              id: 'click',
              name: 'Click Event',
              type: 'graph',
              options: {},
              data: null,
            },
            {
              id: 'hover',
              name: 'Hover Event',
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

  componentDidMount() {
    this.triggerGraphEvent('load')
  }

  triggerGraphEvent = (eventId) => {
    const graphId = this.getPropertyData(eventId);
    if (typeof this.getElementProps().onEvent === 'function') {
      this.getElementProps().onEvent(graphId);
    }
  }

  renderContent() {
    const elemProps = this.getElementProps();
    const defaultWidth = { width: '100%' };
    const defaultVerticalAlign = { verticalAlign: 'top' }
    const imageUrl = this.getPropertyData('image') || '/assets/images/cloud.jpg';
    elemProps.style = Object.assign(this.getDefaultStyle() || {}, {
      backgroundImage: `url(${imageUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      content: `url(${imageUrl})`,
      width: '100%',
      ...this.getPropertyData('vertical-align') &&
      alignVertical(this.getPropertyData('vertical-align').value) || defaultVerticalAlign,
      ...this.getPropertyData('container-width') &&
      containerWidth(this.getPropertyData('container-width').value) || defaultWidth,
      ...this.getPropertyData('align-container') &&
      alignContainer(this.getPropertyData('align-container')),
    });
    
    const {
      parentId,
      componentType,
      componentData,
      isDragging,
      canAcceptDrop,
      hasChildren,
      getComponent,
      getComponentType,
      getComponentPropertyData,
      setPropertyData,
      moveUI,
      moveInto,
      setHoverObject,
      hoverObject,
      onEvent, // eliminate onEvent from passing to div props to avoid `unknown event handler` warning
      ...props
    } = elemProps;
    return (
      <div
        className = "node image"
        onMouseOver = {() => this.triggerGraphEvent('hover')}
        onClick = {() => this.triggerGraphEvent('click')}
        {...props}
      />
    );
  }
}

export default ImageComponent;