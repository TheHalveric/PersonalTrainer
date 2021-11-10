
import AppTabs from './components/AppTabs'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const App = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Personal Trainer App
          </Typography>
        </Toolbar>
      </AppBar>

      <AppTabs />
    </div>
  );
}

export default App
