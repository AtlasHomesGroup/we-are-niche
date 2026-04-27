// App entry — single Orbital format
const { useState, useEffect } = React;

const App = () => {
  return <Constellation data={NICHE_DATA} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
