import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from '@emotion/core';
import Transition from 'react-transition-group/Transition';
import { MdCheck, MdClose } from 'react-icons/md';
import omit from 'lodash/omit';

import { getDisplayName } from '../../../lib/util';
import { LoadingState } from '../assets/LoadingState';
import { Wrapper, State } from './withState.styles';

export const withState = WrappedComponent => (
  class extends Component {
    static propTypes = {
      size: PropTypes.oneOf(['default', 'small', 'large']),
      view: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info', 'primary', 'disable']),
      state: PropTypes.oneOf([null, 'processing', 'success', 'error']),
    }

    static defaultProps = {
      state: null,
      size: 'default',
      view: 'default',
    }

    static displayName = `${getDisplayName(WrappedComponent)}WithState`;

    constructor(props) {
      super(props);
      this.state = {
        state: props.state,
      };
    }

    componentWillReceiveProps(props) {
      const { state } = this.props;
      if (props.state !== state) {
        this.setState({ state: props.state });
      }
    }

    renderInnerState() {
      const { state } = this.state;
      const { size, view } = this.props;
      let iconSize = 24;
      if (size === 'small') iconSize = 20;
      if (size === 'large') iconSize = 28;
      switch (state) {
      case 'processing': return <LoadingState size={size} view={view} />;
      case 'success': return <MdCheck size={iconSize} />;
      case 'error': return <MdClose size={iconSize} />;
      default: return '';
      }
    }

    renderState() {
      const { state } = this.state;
      const { view } = this.props;
      const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 1 },
        exited: { opacity: 0 },
      };
      return (
        <React.Fragment>
          <Transition
            in={!!state}
            unmountOnExit
            timeout={200}
          >
            {s => (
              <State
                view={view}
                state={state}
                style={{
                  ...transitionStyles[s],
                }}
              >
                {this.renderInnerState()}
              </State>
            )}
          </Transition>
        </React.Fragment>
      );
    }

    render() {
      const { state } = this.state;
      const { className, ...props } = this.props;
      return (
        <Wrapper block={props.block} events={!state}>
          {this.renderState()}
          <ClassNames>
            {({ css: _css, cx }) => (
              <WrappedComponent
                {...omit(props, ['state'])}
                className={cx({
                  [_css`box-shadow: none;`]: !!state,
                  [className]: className,
                })}
              />
            )}
          </ClassNames>
        </Wrapper>
      );
    }
  }
);

export default withState;
