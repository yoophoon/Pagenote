import { Box, Divider, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import DateRangeIcon from '@mui/icons-material/DateRange';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TPagenote } from "../pagenoteTypes";

type TPagenotesItem = {
  pagenote: TPagenote
}

export default function PagenotesItem({ pagenote }: TPagenotesItem) {
  const theme = useTheme()
  const [expandPagenote, setExpandPagenote] = useState(false)

  return (
    <Box
      sx={{
        marginLeft: '3rem',
        padding: '1rem',
        paddingRight: '2rem',
        paddingBottom: 0,
        borderLeftColor: theme.palette.secondary.main,
        borderLeftStyle: 'solid',
        borderLeftWidth: '2px',

      }}
      onMouseEnter={() => setExpandPagenote(true)}
      onMouseLeave={() => setExpandPagenote(false)}
    >
      <Box sx={{
        backgroundColor: theme.palette.secondary.main + '99',
        // backgroundClip: 'content-box',
        borderRadius: '5px',
        padding: '1rem',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}>
          <Typography
            component={'span'}
            sx={{
              flexGrow:'50',
              marginRight: '2rem',
              paddingLeft: '0.5rem',
              borderLeftStyle: 'solid',
              borderLeftColor: theme.palette.error.main,
              maxWidth: '500px',
              overFlow: 'hidden',
              whiteSpace: 'wrap',
              textOverflow: 'ellipsis',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              lineHeight: '1.1rem',
            }}>
            {pagenote.pagenoteTitle}
          </Typography>
          <DateRangeIcon sx={{ width: '1.1rem', height: '1.1rem', lineHeight: '1.1rem', color: theme.palette.text.primary + '9', }}></DateRangeIcon>
          <Typography
            component={'span'}
            sx={{
              marginLeft: '0.5rem',
              marginRight: '2rem',
              fontSize: '1.1rem',
              lineHeight: '1.1rem',
              color: theme.palette.text.primary + '9',
            }}>

            {new Date(pagenote.pagenoteID).toLocaleTimeString('zh-cn', {
              //era:'narrow', //公元
              year: '2-digit',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </Typography>
          <BorderColorIcon sx={{ width: '1.1rem', height: '1.1rem', lineHeight: '1.1rem', color: theme.palette.text.primary + '9', }}></BorderColorIcon>
          <Typography
            component={'span'}
            sx={{
              marginLeft: '0.5rem',
              marginRight: '2rem',
              fontSize: '1.1rem',
              lineHeight: '1.1rem',
              color: theme.palette.text.primary + '9',
            }}>

            {new Date(pagenote.pagenoteTimestamp).toLocaleTimeString('zh-cn', {
              //era:'narrow', //公元
              year: '2-digit',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </Typography>
        </Box>
        <Divider></Divider>
        <Typography
          sx={{
            marginTop: '0.5rem',
            whiteSpace: 'break-spaces',
            height: expandPagenote ? 'fit-content' : '1.2rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '1rem',
            lineHeight: '1.2rem',
          }}>
          {pagenote.pagenoteContent}
        </Typography>
      </Box>
    </Box>
  )
}