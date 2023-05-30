import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack, Typography } from '@mui/joy';

import { RepositoryCard } from './RepositoryCard';

const access_token = '';

export const RepositoryList = () => {
  const [org, setOrg] = useState<string>('Netflix');
  const [repos, setRepos] = useState<any[]>([]);

  const fetchData = async () => {
    return axios
      .get(`https://api.github.com/orgs/${org}/repos`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        return data;
      });
  };

  useEffect(() => {
    fetchData().then(data => {
      data.sort((a: any, b: any) => a.stargazers_count < b.stargazers_count ? 1 : -1
      );
      setRepos(data);
    });
  }, []);

  return (
    <Stack direction="column" spacing={1} overflow="hidden">
      <Typography level="h3">{org} Repositories</Typography>
      <Stack direction="column" gap={1}>
        {repos.map(repository => {
          return (
            <RepositoryCard
              name={repository.full_name}
              description={repository.description}
              stars={repository.stargazers_count}
              forks={repository.forks_count}
              created={repository.created_at}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
