import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import ExtensionIcon from '@mui/icons-material/Extension';
import PageviewIcon from '@mui/icons-material/Pageview';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import FunctionsIcon from '@mui/icons-material/Functions';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { ESection } from '../pagenoteTypes';
import { Divider } from '@mui/material';

type TSettingListProps={
  section:ESection
}

export default function SettingList(props:TSettingListProps) {
  return (
    <Timeline position="right"
      sx={{
        display: { xs: 'none', lg: 'flex' },
        position:'fixed',
        top:'50vh',
        transform:'translateY(-50%)',
        left:theme=>theme.mixins.toolbar.minHeight,
        paddingRight:theme=>(theme.mixins.toolbar.minHeight+'px'),
        borderRight:`2px solid`,
        borderRightColor:theme=>theme.palette.primary.main,
        '&>li:before':{
          content: '""',
          flex:0,
          padding:0,
        },
        '& .MuiTimelineContent-root':{
          display:'flex',
          alignItems:'center',
        },
        '& .MuiTimelineConnector-root':{
          backgroundColor:'secondary.main'
        },
        '& .MuiTimelineDot-root':{
          color:'primary.main',
          backgroundColor:'background.default',
          borderWidth:4,
        }
      }}
    >
      <TimelineItem >
        {/* <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="red"
        >
          9:30 am
        </TimelineOppositeContent> */}
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot sx={{borderColor:props.section==ESection.extension?'primary.main':'background.default'}}>
            <ExtensionIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{fontWeight:props.section==ESection.extension?'bolder':'lighter'}}>
            扩展
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        {/* <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          10:00 am
        </TimelineOppositeContent> */}
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot sx={{borderColor:props.section==ESection.page?'primary.main':'background.default'}}>
            <PageviewIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{fontWeight:props.section==ESection.page?'bolder':'lighter'}}>
            网页
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot sx={{borderColor:props.section==ESection.sidepanel?'primary.main':'background.default'}}>
            <ViewSidebarIcon />
          </TimelineDot>
          <TimelineConnector  />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{fontWeight:props.section==ESection.sidepanel?'bolder':'lighter'}}>
            边栏
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector  />
          <TimelineDot sx={{borderColor:props.section==ESection.markdown?'primary.main':'background.default'}}>
            <FunctionsIcon sx={{transform:'rotateZ(90deg)',}}/>
          </TimelineDot >
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{fontWeight:props.section==ESection.markdown?'bolder':'lighter'}}>
            Markdown
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector  />
          <TimelineDot sx={{borderColor:props.section==ESection.backup?'primary.main':'background.default'}}>
            <CloudSyncIcon/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{fontWeight:props.section==ESection.backup?'bolder':'lighter'}}>
            备份
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    );
}