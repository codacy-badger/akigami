/* eslint-disable */
import React, { PureComponent } from 'react';

class Cube extends PureComponent {
    render() {
        return (
            <svg width="42px" height="42px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g transform="translate(25,25)">
                <rect x="-20" y="-20" width="40" height="40" fill="#d54343" transform="scale(1.13716 1.13716)">
                    <animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.4000000000000001;1" keyTimes="0;1" dur="0.9s" keySplines="0 0.5 0.5 1" begin="-0.27s" repeatCount="indefinite"></animateTransform>
                </rect>
                </g>
                <g transform="translate(75,25)">
                <rect x="-20" y="-20" width="40" height="40" fill="#e44f4f" transform="scale(1.18442 1.18442)">
                    <animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.4000000000000001;1" keyTimes="0;1" dur="0.9s" keySplines="0 0.5 0.5 1" begin="-0.18000000000000002s" repeatCount="indefinite"></animateTransform>
                </rect>
                </g>
                <g transform="translate(25,75)">
                <rect x="-20" y="-20" width="40" height="40" fill="#de5a5a" transform="scale(1.00009 1.00009)">
                    <animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.4000000000000001;1" keyTimes="0;1" dur="0.9s" keySplines="0 0.5 0.5 1" begin="0s" repeatCount="indefinite"></animateTransform>
                </rect>
                </g>
                <g transform="translate(75,75)">
                <rect x="-20" y="-20" width="40" height="40" fill="#fc6f6f" transform="scale(1.25655 1.25655)">
                    <animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.4000000000000001;1" keyTimes="0;1" dur="0.9s" keySplines="0 0.5 0.5 1" begin="-0.09000000000000001s" repeatCount="indefinite"></animateTransform>
                </rect>
                </g>
            </svg>
        );
    }
}

export default Cube;
