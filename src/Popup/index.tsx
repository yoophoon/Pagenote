import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { Paper, Stack, SvgIcon } from '@mui/material';
import './index.css'
import Bottom from './Bottomer'
import { GitHub, MaterialUi, SvgReact, Vite } from '../assets/svg'

export default function Popup() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], verticalAlign: 'middle' }} aria-label="recipe">
                        PN
                    </Avatar>
                }
                title={
                    <Typography sx={{ fontSize: 36, lineHeight: 1, verticalAlign: 'middle', m: 0, mb: 1 }}>
                        pagenote
                    </Typography>}
                subheader={
                    <Stack direction="row" spacing={1.2} sx={{ verticalAlign: 'middle' }}>
                        <Typography sx={{ fontSize: 12, lineHeight: 1, verticalAlign: 'middle' }}>
                            powered by
                        </Typography>
                        <SvgIcon component={GitHub} inheritViewBox sx={{ width: 12, height: 12 }}></SvgIcon>
                        <SvgIcon component={SvgReact} inheritViewBox sx={{ width: 12, height: 12 }}></SvgIcon>
                        <SvgIcon component={MaterialUi} inheritViewBox sx={{ width: 12, height: 12 }}></SvgIcon>
                        <SvgIcon component={Vite} inheritViewBox sx={{ width: 12, height: 12 }}></SvgIcon>
                    </Stack>
                }
            />
            <hr />
            {/* 中间文本内容，为了简约只显示一句话 */}
            <CardContent>
                <Paper elevation={3}>
                    <Typography variant="h5" color="text.secondary" sx={{
                        textAlign: 'center',
                        pt: 4, pb: 4,
                        fontFamily: ["Xingxingniannian-Bold-2", 'Roboto']
                    }}>
                        留下你的想法、观点
                    </Typography>
                </Paper>
            </CardContent>
            <hr />
            {/* 底部按钮 */}
            <Bottom />
        </Card>
    );
}