import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Divider, Box, Stack, Typography, Grid } from '@mui/joy';

const access_token = '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';

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  created: number;
}

const Repo = ({ name, description, stars, forks, created }: Repository) => {
  const [languages, setLanguages] = useState([]);

  const fetchData = async () => {
    console.log(name);
    return axios
      .get(`https://api.github.com/repos/${name}/languages`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setLanguages(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card orientation="horizontal" variant="outlined">
      <Box width="100%" height="100%">
        <Stack direction="column" height="inherit" gap={1}>
          <Box>
            <Typography level="h4">{name}</Typography>
          </Box>
          <Divider />
          <Box>
            <Typography display="inline-block">
              Languages: {Object.keys(languages).join(', ')}
            </Typography>
            <Typography>Description: {description}</Typography>
            <Typography>Star Count: {stars}</Typography>
            <Typography>Fork Count: {forks}</Typography>
            <Typography>
              Created: {new Date(created).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};

export const RepoTable = () => {
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
            <Repo
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
