import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Stack,
  Box,
  Divider,
} from '@mui/joy';

import { CommitCard } from './RepositoryCard';

const access_token = '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';

export interface ModalProps {
  openModal: boolean;
  toggleModal: () => void;
  repositoryName: string;
}

export const Dialog = ({
  openModal,
  toggleModal,
  repositoryName,
}: ModalProps) => {
  const [commits, setCommits] = useState<any[]>([]);

  const fetchData = async () => {
    return axios
      .get(`https://api.github.com/repos/${repositoryName}/commits`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        data.sort((a: any, b: any) => new Date(a.commit.author.date) < new Date(b.commit.author.date)
          ? 1
          : -1
        );
        setCommits(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Modal open={openModal} onClose={toggleModal}>
      <ModalDialog>
        <Stack direction="column" spacing={1} overflow="hidden">
          <Box display="flex" justifyContent="space-between">
            <Typography>Commits for {repositoryName}</Typography>
            <ModalClose />
          </Box>
          <Divider />
          <Stack direction="column" spacing={1} overflow="scroll">
            {commits.map(commit => (
              <CommitCard
                commitMessage={commit.commit.message}
                commitHash={commit.sha}
                commitUsername={commit.commit.author.name}
                created={commit.commit.author.date}
              />
            ))}
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
