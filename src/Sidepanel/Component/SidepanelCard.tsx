import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EPosition, TPagenote } from '../../pagenoteTypes';
import Paper from '@mui/material/Paper';
import { ButtonPositionStatic } from '../../Components/styledComponent';

type TSidepanelCard={
  pagenote:TPagenote,
}
export default function SidepanelCard({pagenote}:TSidepanelCard) {

  console.log(pagenote)

  const [mouseIn,setMouseIn]=React.useState(false)
  //mouseenter和mouseleave只对监听元素本身有效，如果只监听一个元素则会在鼠标进入监听元素内部元素触发其对应事件导致状态更新
  //mousein和mouseout监听元素本身及其内部元素，如果只监听一个元素会导致鼠标在移入不同元素时频繁触发状态更新
  //优化方式:采用mouseenter和mouseleave对不同的元素进行监听，即便多次触发事件也为同一事件(事件设置的状态值相同)，避免组件频繁更新
  const mouseInRef=React.useRef<HTMLDivElement | null>(null)
  const mouseOutRef=React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const handlerMouseIn = () => {
      setMouseIn(true)
    }

    const handlerMouseOut = () => {
      setMouseIn(false)
    }

    mouseInRef.current?.addEventListener('mouseenter', handlerMouseIn)
    mouseOutRef.current?.addEventListener('mouseleave', handlerMouseOut)

    return () => {
      mouseInRef.current?.removeEventListener('mouseenter', handlerMouseIn)
      mouseOutRef.current?.removeEventListener('mouseleave', handlerMouseOut)
    }
  }, [])
  if(pagenote.pagenoteTitle==pagenote.pagenoteFragment?.textStart&&pagenote.pagenoteContent==((pagenote?.pagenoteFragment.prefix??'')+
                                                                                              pagenote?.pagenoteFragment.textStart+
                                                                                              (pagenote?.pagenoteFragment.textEnd??'')+
                                                                                              (pagenote?.pagenoteFragment.suffix??''))
  ){
    return <div>样式笔记</div>
  }
  return (
    <Card sx={{mb:1}} ref={mouseOutRef}>
      {
        <CardHeader
        ref={mouseInRef}
        sx={{p:0,pl:2,pt:1,pb:mouseIn?0:1}}
        avatar={
          <Avatar sx={{ bgcolor: red[500],position:'static'}} aria-label="recipe">
            {
              (pagenote.editorPosition==EPosition.afterPagenoteFragment?'A':'')+
              (pagenote.editorPosition==EPosition.inPage?'I':'')+
              (pagenote.editorPosition==EPosition.followPagenoteFragment?'F':'')
            }
          </Avatar>
        }
        title={pagenote.pagenoteTitle}
        subheader={`创建时间:${new Date(pagenote.pagenoteID).toLocaleTimeString('zh-cn',{
          //era:'narrow', //公元
          year:'2-digit',
          month:'long',
          day:'numeric',
          weekday:'long',
          hour:'2-digit',
          minute:'2-digit',
          second:'2-digit',
        })}`}
      />
      }
      {
        mouseIn && <CardContent sx={{
          p: 1, pl: 2, '&:last-child': {
            p: 1, pl: 2,
          }
        }}>
          <Paper elevation={3}
            sx={{
              p: '0.5rem',
              width: '100%',
              minHeight: '2rem',
              maxHeight: '10rem',
              overflowY: 'auto',
              wordBreak: 'break-word',
              whiteSpace: 'break-spaces',
              textOverflow: 'unset',
              scrollbarWidth: 'thin',
              margin: 0,
              scrollbarColor: theme => `${theme.palette.success.main} #0000`,

            }}>
            {pagenote.pagenoteContent}
          </Paper>
        </CardContent>
      }
      {
        mouseIn&&<CardActions disableSpacing sx={{p:0,pl:2}}>
          <ButtonPositionStatic aria-label="add to favorites">
            <FavoriteIcon />
          </ButtonPositionStatic>
          <ButtonPositionStatic aria-label="share">
            <ShareIcon />
          </ButtonPositionStatic>
        </CardActions>
      }
      
    </Card>
  );
}
