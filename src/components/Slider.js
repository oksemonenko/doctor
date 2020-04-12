import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity';
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

    this.flickity.on('cellSelect', this.onCellSelect);
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
    const needToChooseStack = prevProps.activeIndex !== this.props.activeIndex;

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity();
    }
    if (needToOpenStack) {
      this.openStack();
    }
    if (needToCloseStack) {
      this.closeStack();
    }
    if (needToChooseStack) {
      this.chooseStack(this.props.activeIndex);
    }
  }

  getStackNodes = () => {
    const stacksWrapper = this.flickityNode.querySelector('.flickity-slider');
    const stacks = [...stacksWrapper.children];
    const prevStack = stacksWrapper.querySelector('.stack-prev');
    const nextStack = stacksWrapper.querySelector('.stack-next');
    return {
      stacks,
      prevStack,
      nextStack,
    };
  };

  onCellSelect = () => {
    const bodyEl = document.body;
    bodyEl.classList.remove('item-clickable');

    const {
      stacks,
      prevStack,
      nextStack,
    } = this.getStackNodes();

    const selidx = this.flickity.selectedIndex;
    const cellsCount = this.flickity.cells.length;
    const previdx = selidx > 0 ? selidx - 1 : cellsCount - 1;
    const nextidx = selidx < cellsCount - 1 ? selidx + 1 : 0;

    if(prevStack) {
      prevStack.classList.remove('stack-prev');
    }
    if(nextStack) {
      nextStack.classList.remove('stack-next');
    }

    stacks[previdx].classList.add('stack-prev');
    stacks[nextidx].classList.add('stack-next');
  };


  onEndTransition = function( el, callback ) {
    // add this to not trigger eslint no-undef
    /* global Modernizr */
    console.log('Modernizr', Modernizr);
    const support = { transitions: Modernizr.csstransitions };
    // transition end event name
    const transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend',
    };
    const transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
    const onEndCallbackFn = function( ev ) {
      if( support.transitions ) {
        if( ev.target != this ) return;
        this.removeEventListener( transEndEventName, onEndCallbackFn );
      }
      if( callback && typeof callback === 'function' ) { callback.call(this); }
    };
    if( support.transitions ) {
      el.addEventListener( transEndEventName, onEndCallbackFn );
    }
    else {
      onEndCallbackFn();
    }
  };

  openStack = () => {
    const bodyEl = document.body;
    bodyEl.classList.add('view-full');
    setTimeout(function() {
      bodyEl.classList.add('move-items');
    }, 25);
    const stackNode = this.props.getStackNode();
    bodyEl.style.height = stackNode.offsetHeight + 'px';

    this.flickity.unbindDrag();
    this.flickity.options.accessibility = false;
  };

  closeStack = () => {
    const bodyEl = document.body;
    bodyEl.classList.remove('move-items');

    this.onEndTransition(this.flickityNode, function() {
      bodyEl.classList.remove('view-full');
      bodyEl.style.height = '';
    });
    this.flickity.bindDrag();
    this.flickity.options.accessibility = true;
  };

  chooseStack = (index) => {
    const { stacks } = this.getStackNodes();

    if(stacks[index].classList.contains('stack-prev')) {
      this.flickity.previous(true);
    }
    if(stacks[index].classList.contains('stack-next')) {
      this.flickity.next(true);
    }
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
