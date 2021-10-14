import {
    AppBar,
    Box,
    Toolbar,
    Typography
} from '@mui/material';
import { Search } from "components";

const Header = ({ setParams }) => {
    return (
        <Box sx={{ flex: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        FinProH8
                    </Typography>
                    <Search setParams={setParams} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
