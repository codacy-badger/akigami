import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { getDisplayName } from '../../../lib/util';

export const withStateful = WrappedComponent => (
  class extends PureComponent {
    static propTypes = {
      stableSuccess: PropTypes.bool,
      timerMillis: PropTypes.number,
      baseState: PropTypes.oneOf([null, 'success', 'error']),
      size: PropTypes.oneOf(['default', 'small', 'large']),
      view: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info', 'primary', 'disable']),
      state: PropTypes.oneOf([null, 'processing', 'success', 'error']),
      onClick: PropTypes.func,
      onError: PropTypes.func,
      onSuccess: PropTypes.func,
    }

    static defaultProps = {
      stableSuccess: false,
      baseState: null,
      timerMillis: 2000,
      state: null,
      size: 'default',
      view: 'default',
      onError: null,
      onSuccess: null,
      onClick: null,
    }

    static displayName = `${getDisplayName(WrappedComponent)}WithStateful`;

    constructor(props) {
      super(props);
      this.timeoutId = null;
      this.resetInternalStateAfterProcessing = false;
      this.state = {
        ...super.state,
        internalState: null,
      };
      this.onClick = this.onClick.bind(this);
      this.getButtonState = this.getButtonState.bind(this);
      this.doResetInternalState = this.doResetInternalState.bind(this);
      this.doResetInternalStateAfterTimer = this.doResetInternalStateAfterTimer.bind(this);
    }

    componentDidMount() {
      this.isMounted = true;
    }

    componentWillReceiveProps(props) {
      const { internalState } = this.state;
      const { baseState } = this.props;
      if (props.state) {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
      }
      if (props.baseState !== baseState) {
        if (internalState === 'processing') {
          this.resetInternalStateAfterProcessing = true;
        } else {
          this.doResetInternalState();
        }
      }
    }

    componentWillUnmount() {
      this.isMounted = false;
    }

    onClick(e) {
      if (this.getButtonState() === null) {
        const {
          onClick,
          state,
        } = this.props;
        this.resetInternalStateAfterProcessing = false;

        let event;
        if (onClick) event = onClick(e);
        else event = Promise.resolve;

        if (!state) {
          this.setState({
            internalState: 'processing',
          }, () => this.attachPromiseHandlers(event));
        }
      }
    }

    get isMounted() {
      return this.privateIsMounted;
    }

    get resetInternalStateAfterProcessing() {
      return this.privateResetInternalStateAfterProcessing;
    }

    get timeoutId() {
      return this.privateTimeoutId;
    }

    set isMounted(action) {
      this.privateIsMounted = action;
    }

    set resetInternalStateAfterProcessing(action) {
      this.privateResetInternalStateAfterProcessing = action;
    }

    set timeoutId(action) {
      this.privateTimeoutId = action;
    }

    getButtonState() {
      const { internalState } = this.state;
      const { state, baseState } = this.props;
      return state || internalState || baseState;
    }

    privateTimeoutId;

    privateResetInternalStateAfterProcessing;

    privateIsMounted;

    doResetInternalState() {
      if (this.isMounted) {
        this.setState({
          internalState: null,
        });
      }
    }

    doResetInternalStateAfterTimer() {
      const { timerMillis } = this.props;
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null;
        this.doResetInternalState();
      }, timerMillis);
    }

    attachPromiseHandlers(promise) {
      const { stableSuccess, onError, onSuccess } = this.props;
      if (typeof promise === 'object') {
        return promise.then((data) => (
          this.isMounted && this.setState({
            internalState: 'success',
          }, async () => {
            if (!stableSuccess) {
              this.doResetInternalStateAfterTimer();
            } else if (this.resetInternalStateAfterProcessing) {
              this.doResetInternalState();
            }
            if (onSuccess) await onSuccess(data);
          })
        )).catch((err) => {
          if (this.isMounted) {
            this.setState({
              internalState: 'error',
            }, async () => {
              this.doResetInternalStateAfterTimer();
              if (onError) await onError(err);
            });
          }
        });
      }

      this.doResetInternalState();
      return promise;
    }

    render() {
      return (
        <WrappedComponent
          {...omit(this.props, ['onClick', 'state', 'onSuccess', 'onError'])}
          onClick={this.onClick}
          state={this.getButtonState()}
        />
      );
    }
  }
);

export default withStateful;
