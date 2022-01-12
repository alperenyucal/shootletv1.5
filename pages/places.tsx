import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useLayout } from '../lib/hooks/layout';
import { User } from '../lib/models/UserModel';
import { APIQuery } from '../lib/types/APIQuery';

const Test: NextPage = () => {
  const [me, setMe] = useState<APIQuery<User>>();
  useEffect(() => {
    axios.get('/api/user/me').then(({ data }) => {
      setMe(data);
    });
  }, []);

  useLayout({
    navbar: { transparent: true },
  });

  return <div>{me?.firstname} {me?.lastname}</div>;
};

export default Test;
