import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import floatToYearsMonths from '../../../utils/age';
import { TArchivePet } from '../../../types/types';
import ArchivePetModal from '../../Modal/AchivePetModal.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Tooltip } from '@mui/material';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ArchiveCard: React.FC<TArchivePet> = ({ id, name, age, image, text, hasHistory, history }) => {
  const [expanded, setExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isAuth } = useSelector((state: RootState) => state.user)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
        <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="subtitle2" component="div">
                {floatToYearsMonths(age)}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
          <CardActions disableSpacing>
            { isAuth && 
              <IconButton color='primary' onClick={() => setShowEditModal(true)}>
                <BorderColorIcon />
              </IconButton>
            }
            { hasHistory && 
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              > 
                <Tooltip title='Посмотреть историю' placement="top">
                  <ExpandMoreIcon />
                </Tooltip>
              </ExpandMore>
            }
          </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>
              {history}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      { showEditModal && <ArchivePetModal text={text} history={history} petId={id} open={showEditModal} onClose={() => setShowEditModal(false)} />}
    </>
  );
}
 
export default ArchiveCard;
