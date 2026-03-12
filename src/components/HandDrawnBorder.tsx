import React from 'react';

export const HandDrawnBorder: React.FC = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        <filter id="squiggle-0">
          <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="squiggle-1">
          <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="squiggle-2">
          <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="squiggle-3">
          <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
};
