import React, {Component} from 'react';
import {PanResponder, Animated} from 'react-native';

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
  ON_PRESS: 'ON_PRESS',
  ON_LONGPRESS: 'ON_LONGPRESS',
  ON_LONGPRESS_RELEASE: 'ON_LONGPRESS_RELEASE',
};
var startTime, endTime, longpress;
const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5,
};

function isValidSwipe(
  velocity,
  velocityThreshold,
  directionalOffset,
  directionalOffsetThreshold,
) {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  );
}

class GestureRecognizer extends Component {
  constructor(props, context) {
    super(props, context);
    this.swipeConfig = Object.assign(swipeConfig, props.config);
    const responderEnd = this._handlePanResponderEnd.bind(this);
    const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderGrant: (e, gestureState) => {
        this.onLongPressTimeout = setTimeout(() => {
          this._triggerSwipeHandlers('ON_LONGPRESS', gestureState);
        }, this.props.longpressDelay);
      },
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.config !== prevProps.config) {
      this.swipeConfig = Object.assign(swipeConfig, this.props.config);
    }
  }

  _handleShouldSetPanResponder(evt, gestureState) {
    startTime = new Date().getTime();
    return this.props.swipeEnabled && evt.nativeEvent.touches.length === 1;
  }

  _gestureIsClick(gestureState) {
    return (
      Math.abs(gestureState.dx) < swipeConfig.gestureIsClickThreshold &&
      Math.abs(gestureState.dy) < swipeConfig.gestureIsClickThreshold
    );
  }

  _handlePanResponderEnd(evt, gestureState) {
    const swipeDirection = this._getSwipeDirection(gestureState);
    this._triggerSwipeHandlers(swipeDirection, gestureState);
    clearTimeout(this.onLongPressTimeout);
  }

  _triggerSwipeHandlers(swipeDirection, gestureState) {
    const {
      onSwipe,
      onSwipeUp,
      onSwipeDown,
      onSwipeLeft,
      onSwipeRight,
      onPress,
      onLongPress,
      onLongPressRelease,
    } = this.props;
    const {
      SWIPE_LEFT,
      SWIPE_RIGHT,
      SWIPE_UP,
      SWIPE_DOWN,
      ON_PRESS,
      ON_LONGPRESS,
      ON_LONGPRESS_RELEASE,
    } = swipeDirections;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gestureState);
        break;
      case ON_PRESS:
        onPress && onPress(gestureState);
        break;
      case ON_LONGPRESS:
        onLongPress && onLongPress(gestureState);
        break;
      case ON_LONGPRESS_RELEASE:
        onLongPressRelease && onLongPressRelease(gestureState);
        break;
    }
  }

  _getSwipeDirection(gestureState) {
    const {
      SWIPE_LEFT,
      SWIPE_RIGHT,
      SWIPE_UP,
      SWIPE_DOWN,
      ON_PRESS,
      ON_LONGPRESS,
      ON_LONGPRESS_RELEASE,
    } = swipeDirections;
    const {dx, dy} = gestureState;
    endTime = new Date().getTime();
    longpress = endTime - startTime > this.props.longpressDelay ? true : false;

    if (this._gestureIsClick(gestureState) && longpress) {
      return ON_LONGPRESS_RELEASE;
    }

    if (this._gestureIsClick(gestureState) && !longpress) {
      return ON_PRESS;
    }

    if (this._isValidHorizontalSwipe(gestureState)) {
      return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
    }
    if (this._isValidVerticalSwipe(gestureState)) {
      return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
    }
    return null;
  }

  _isValidHorizontalSwipe(gestureState) {
    const {vx, dy} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  }

  _isValidVerticalSwipe(gestureState) {
    const {vy, dx} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  }

  render() {
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={this.props.gestureStyle}>
        {this.props.children}
      </Animated.View>
    );
  }
}
GestureRecognizer.defaultProps = {
  swipeEnabled: true,
  longpressDelay: 500,
};
export default GestureRecognizer;
