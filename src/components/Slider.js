import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity';
import smoothscroll from 'smoothscroll';
import 'flickity/dist/flickity.min.css';
import { throttle } from 'lodash';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canOpen: false,
      flickityReady: false,
    };

    this.refreshFlickity = this.refreshFlickity.bind(this);
  }

  componentDidMount() {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {});

    this.setState({
      canOpen: true,
      flickityReady: true,
    });

    window.addEventListener('resize', this.onResize);
    this.flickity.on('cellSelect', this.onCellSelect);
    // this.flickity.on('cellSelect', this.onCellSelectHandler);
    this.flickity.on('dragStart', this.onDragStart);
    this.flickity.on('settle', this.onSettle);
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

    if (prevProps.selectedIndex !== this.props.selectedIndex
      || prevProps.count !== this.props.count) {
      this.onSelectStack(this.props.selectedIndex);
    }

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity();
      // this.onCellSelect(this.props.selectedIndex);
    }
    if (needToOpenStack) {
      this.onOpenStack();
    }
    if (needToCloseStack) {
      this.onCloseStack();
    }
  }

  // window resize
  onResize = throttle ((ev) => {
    // recalculate window width/height
    const win = { width: window.innerWidth, height: window.innerHeight };
    const bodyEl = document.body;
    const { stacks } = this.getStackNodes();
    // reset body height if stack is opened
    if(bodyEl.classList.contains('view-full') ) {
      // stack is opened
      bodyEl.style.height = stacks[this.flickity.selectedIndex].offsetHeight + 'px';
    }
  }, 50);

  getStackNodes = () => {
    const stacksWrapper = this.flickityNode.querySelector('.flickity-slider');
    const stacks = [...stacksWrapper.children];
    const selectedStack = stacksWrapper.querySelector('.is-selected');
    const prevStack = stacksWrapper.querySelector('.stack-prev');
    const nextStack = stacksWrapper.querySelector('.stack-next');
    return {
      stacks,
      selectedStack,
      prevStack,
      nextStack,
    };
  };

  // onCellSelectHandler = () => {
  //   const selidx = this.flickity.selectedIndex;
  //   console.log('onChange onCellSelectHandler', selidx);
  //
  //   this.props.onChange(selidx);
  // };

  onCellSelect = (index = this.flickity.selectedIndex) => {
    this.setState({
      canOpen: false,
    });
    const bodyEl = document.body;
    bodyEl.classList.remove('item-clickable');

    const {
      stacks,
      prevStack,
      nextStack,
    } = this.getStackNodes();

    const cellsCount = this.flickity.cells.length;
    const previdx = index > 0 ? index - 1 : cellsCount - 1;
    const nextidx = index < cellsCount - 1 ? index + 1 : 0;

    if(prevStack) {
      prevStack.classList.remove('stack-prev');
    }
    if(nextStack) {
      nextStack.classList.remove('stack-next');
    }

    stacks[previdx].classList.add('stack-prev');
    stacks[nextidx].classList.add('stack-next');
    this.onSettle();
  };

  onDragStart = () => {
    console.log('flickity onDragStart');
    this.setState({
      canOpen: false,
    });
    const bodyEl = document.body;
    bodyEl.classList.remove('item-clickable');
  };

  onSettle = () => {
    console.log('flickity onSettle');
    this.setState({
      canOpen: true,
    });
    const bodyEl = document.body;
    bodyEl.classList.add('item-clickable');
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
        // if( ev.target !== this ) return;
        this.removeEventListener( transEndEventName, onEndCallbackFn );
      }
      if( callback && typeof callback === 'function' ) {
        callback.call(this);
      }
    };
    if( support.transitions ) {
      el.addEventListener( transEndEventName, onEndCallbackFn );
    }
    else {
      onEndCallbackFn();
    }
  };

  onOpenStack = () => {
    const { canOpen } = this.state;
    console.log('onOpenStack', canOpen);
    if (canOpen) {
      const bodyEl = document.body;
      bodyEl.classList.add('view-full');
      setTimeout(function() {
        bodyEl.classList.add('move-items');
      }, 25);
      const { selectedStack } = this.getStackNodes();
      bodyEl.style.height = selectedStack.offsetHeight + 'px';
      console.log('onOpenStack', selectedStack);
      this.flickity.unbindDrag();
      this.flickity.options.accessibility = false;
    }
  };

  scrollY = () => {
    const docElem = window.document.documentElement;
    console.log('scrollY', window.pageYOffset, docElem.scrollTop);
    return window.pageYOffset || docElem.scrollTop;
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

  onCloseStack = () => {
    // if the user scrolled down, let's first scroll all up before closing the stack.
    const scrolled = this.scrollY();
    const bodyEl = document.body;
    const docElem = window.document.documentElement;
    const isFirefox = typeof InstallTrigger !== 'undefined';
    if(scrolled > 0) {
      console.log('onCloseStack', scrolled);
      smoothscroll(isFirefox ? docElem : bodyEl || docElem, 0, 500);
      this.closeStack();
    }
    else {
      this.closeStack();
    }
  };

  onSelectStack = (index = this.flickity.selectedIndex) => {
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
