import * as React from 'react';

export default function HomePage() {
  const [apiOK, setApiOK] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetch('https://simon-cookbook-backend.herokuapp.com/')
      .then((res) => res.text())
      .then((text) => {
        if (text) {
          setApiOK(true);
        }
      });
  });

  return (
    <div>
      <h1>Cookbook frontend</h1>
      <h2>API {apiOK ? 'OK' : 'not OK'}</h2>
    </div>
  );
}
