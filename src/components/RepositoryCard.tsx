import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, Typography, Stack, Box, Divider } from '@mui/joy';
import { Dialog } from './Dialog';

const access_token = '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';

interface RepositoryProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  created: number;
}

export interface CommitProps {
  commitMessage: string;
  commitUsername: string[];
  commitHash: string;
  created: number;
}

export const RepositoryCard = ({
  name,
  description,
  stars,
  forks,
  created,
}: RepositoryProps) => {
  const [languages, setLanguages] = useState([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

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
    <>
      <Card
        orientation="horizontal"
        variant="outlined"
        onClick={toggleModal}
        sx={{ cursor: 'pointer' }}
      >
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
      <Dialog
        openModal={openModal}
        toggleModal={toggleModal}
        repositoryName={name}
      />
    </>
  );
};

export const CommitCard = ({
  commitMessage,
  commitUsername,
  commitHash,
  created,
}: CommitProps) => {
  return (
    <Card orientation="horizontal" variant="outlined">
      <Box width="100%" height="100%">
        <Stack direction="column" height="inherit" gap={1}>
          <Box>
            <Typography>Commit Message: {commitMessage}</Typography>
            <Typography>Commit User: {commitUsername}</Typography>
            <Typography>Commit Hash: {commitHash}</Typography>
            <Typography>
              Created: {new Date(created).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};
