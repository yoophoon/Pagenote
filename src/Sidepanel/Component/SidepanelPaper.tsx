import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';



type TSidepanelPaper={
  children:string,
}

export default function SidepanelPaper({children}:TSidepanelPaper) {
  return (
      <Paper variant="elevation">{children}</Paper>
  );
}