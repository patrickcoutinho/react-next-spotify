import React, { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

const Callback: React.FC = () => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (router) {
      const accessToken = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
          if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});

      if ('access_token' in accessToken) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        accessToken.expirationDate = expirationDate;
      }

      localStorage.setItem(
        '@react-app/accessToken',
        'access_token' in accessToken ? JSON.stringify(accessToken) : '',
      );

      localStorage.setItem(
        '@react-app/alreadyAuthorized',
        'access_token' in accessToken ? '1' : '0',
      );
    }

    router.push('/');
  }, []);

  return <div>Redirecionando...</div>;
};

export default Callback;
