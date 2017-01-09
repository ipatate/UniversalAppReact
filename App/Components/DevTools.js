import React from 'react';
import { createDevTools } from 'redux-devtools';
// import Inspector from 'redux-devtools-inspector';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    defaultSize={1}
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w"
  >
    <LogMonitor theme="solarized" />
  </DockMonitor>
);
