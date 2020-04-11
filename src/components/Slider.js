import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity';
// import Modernizr from 'modernizr';
import 'flickity/dist/flickity.min.css';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flickityReady: false,
    };

    this.refreshFlickity = this.refreshFlickity.bind(this);
  }

  componentDidMount() {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {});

    this.setState({
      flickityReady: true,
    });
  }

  refreshFlickity() {
    this.flickity.reloadCells();
    this.flickity.resize();
    this.flickity.updateDraggable();
  }

  componentWillUnmount() {
    this.flickity.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady;
    const childrenDidChange = prevProps.children.length !== this.props.children.length;
    const needToOpenStack = !prevProps.stackIsOpened && this.props.stackIsOpened;
    const needToCloseStack = prevProps.stackIsOpened && !this.props.stackIsOpened;

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity();
    }
    if (needToOpenStack) {
      this.openStack();
    }
    if (needToCloseStack) {
      this.closeStack();
    }
  }

  // onEndTransition = function( el, callback ) {
  //   const support = { transitions: Modernizr.csstransitions };
  //   // transition end event name
  //   const transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' };
  //   const transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
  //   const onEndCallbackFn = function( ev ) {
  //     if( support.transitions ) {
  //       if( ev.target != this ) return;
  //       this.removeEventListener( transEndEventName, onEndCallbackFn );
  //     }
  //     if( callback && typeof callback === 'function' ) { callback.call(this); }
  //   };
  //   if( support.transitions ) {
  //     el.addEventListener( transEndEventName, onEndCallbackFn );
  //   }
  //   else {
  //     onEndCallbackFn();
  //   }
  // };

  openStack = () => {
    const bodyEl = document.body;
    bodyEl.classList.add('view-full');
    setTimeout(function() {
      bodyEl.classList.add('move-items');
    }, 25);
    bodyEl.style.height = this.props.stackNode.offsetHeight + 'px';

    this.flickity.unbindDrag();
    this.flickity.options.accessibility = false;
  };

  closeStack = () => {
    const bodyEl = document.body;
    bodyEl.classList.remove('view-full');
    // const slider = document.querySelector('.stack-slider');
    // bodyEl.classList.remove('view-full');
    // bodyEl.style.height = '';
    // this.flickity.bindDrag();
    // this.flickity.options.accessibility = true;
    //
    // this.onEndTransition(slider, function() {
    //   bodyEl.classList.remove('view-full');
    //   bodyEl.style.height = '';
    //   this.flickity.bindDrag();
    //   this.flickity.options.accessibility = true;
    // });
  };

  renderPortal() {
    if (!this.flickityNode) {
      return null;
    }

    const mountNode = this.flickityNode.querySelector('.flickity-slider');

    if (mountNode) {
      document.body.classList.add('view-init');
      return ReactDOM.createPortal(this.props.children, mountNode);
    }
  }

  render() {
    return [
      <div className={'stacks-wrapper'} key="flickityBase" ref={node => (this.flickityNode = node)} />,
      this.renderPortal(),
    ].filter(Boolean);
  }
}
