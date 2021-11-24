import React, { useState } from 'react'
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'
import Calendar from './Calendar'
import {
	Routes,
	Route,
	Link
} from 'react-router-dom'

import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone'
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone'


const drawerWidth = 240

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
})

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
})

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
)

const Menu = () => {
	const theme = useTheme()
	const [open, setOpen] = useState(false)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: '36px',
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
						<Typography variant="h6" noWrap component="div">
              Personal Trainer
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>

			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />

				<List>
					<Link to='/' style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
						<ListItem button >
							<ListItemIcon >
								<PeopleAltTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary={'Customers'} />
						</ListItem>
					</Link>
					<Link to='/trainings' style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
						<ListItem button >
							<ListItemIcon >
								<FitnessCenterTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary={'Trainings'} />
						</ListItem>
					</Link >
					<Link to='/calendar'>
						<ListItem button>
							<ListItemIcon >
								<EventTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary={'Calendar'} />
						</ListItem>
					</Link>
				</List>
				<Divider />

				<List>
					<Link to='/statistics'>
						<ListItem button>
							<ListItemIcon>
								<QueryStatsTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary={'Statistics'} />
						</ListItem>
					</Link>
				</List>

			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />

				<Routes>
					<Route path='/' element={<CustomerList />} />
					<Route path='/trainings' element={<TrainingList />} />
					<Route path='/calendar' element={<Calendar />} />
				</Routes>
			</Box>
		</Box>
	)
}

export default Menu
