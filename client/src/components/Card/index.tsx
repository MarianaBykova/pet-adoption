import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { CardActionArea, CardActions } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ImageSlider from '../ImageSlider';
import { TPetType } from '../../types/types';
import { Link } from 'react-router-dom';
import './card.scss'
import floatToYearsMonths from '../../utils/age';
import Button from '../Button';

const PetCard: React.FC<TPetType> = ({id, name, age, sex, activity, image}) => {
  return (
    <Card sx={{ maxWidth: 200 }} className='card'>
      {sex === 'М' ? <MaleIcon className='gender-icon male'/>: <FemaleIcon className='gender-icon female'/>}
      {/* <CardActionArea> */}
      <Link to={'/pet/'+id}>
        <ImageSlider images={image}/>
      </Link>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6" component="div" className='card__title'>
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
        <Typography gutterBottom variant="subtitle1" component="div">
          Активность: <span style={{color: '#d81b60'}}>{activity}</span>/5
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Link to={'/pet/'+id}><Button variant='text' size='small'>Узнать подробнее</Button></Link>
      </CardActions>
    </Card>
  );
}

export default PetCard;
