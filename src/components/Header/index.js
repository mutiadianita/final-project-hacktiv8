import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material';
import { Search } from "components";

const Header = ({ onSearch }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Mutia's Final Project
          </Typography>
          <Search onSearch={onSearch} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;