import GitHubIcon from '@mui/icons-material/GitHub';

import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <a href='https://github.com/MarianaBykova' target='_blank' rel="noopener">
          <GitHubIcon />
          <span className='footer__content-text'>Mariana Bykova</span>
        </a>
      </div>
    </footer>
  );
}
 
export default Footer;
