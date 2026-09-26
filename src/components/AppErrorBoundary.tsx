import React from 'react';
export class AppErrorBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
 state = {failed: false};
 static getDerivedStateFromError() { return {failed: true}; }
 render() { return this.state.failed ? <main className="error-state" role="alert"><h1>We couldn’t open this view.</h1><p>Your saved library remains on this device. Reload to try again.</p><button className="primary-button" onClick={() => location.reload()}>Reload Mulika</button></main> : this.props.children; }
}
