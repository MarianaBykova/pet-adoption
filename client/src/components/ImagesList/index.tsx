import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';

type TImagesList = {
  data: Array<string>
}

const ImagesList: React.FC<TImagesList> = ({data}) => {
  return (
    <Box sx={{ width: 700, height: 450 }}>
      <ImageList variant="masonry" cols={2} gap={8}>
        {data.map((item) => (
          <ImageListItem key={item}>
            <img
              src={`${item}?w=248&fit=crop&auto=format`}
              srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt="pet picture"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
 
export default ImagesList;
