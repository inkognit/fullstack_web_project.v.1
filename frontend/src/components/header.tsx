import {
    AppBar,
    Button,
    createTheme,
    Grid,
    IconButton,
    Link,
    Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles'
import { FC } from 'react'
import { routers } from '../app/routers'

const theme = createTheme()

export const Header: FC<{ is_auth: boolean }> = ({ is_auth }) => {
    const classes = useStyles(theme)
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                >
                    {/* <MenuIcon /> */}
                </IconButton>
                <Grid className={classes.title}>
                    <Link
                        href={routers.main}
                        color="secondary"
                    //
                    >
                        <Button>

                            {/* <Typography variant="h6" className={classes.title}> */}
                            Main

                        </Button>
                    </Link>
                </Grid>

                {is_auth ? (<>

                    <Link href={routers.registration} color="inherit">
                        <Button >
                            LOGIN
                        </Button>
                    </Link>
                    <Link href={routers.auth} color="inherit">
                        <Button >
                            AUTH
                        </Button>
                    </Link>

                </>) : (<>
                    <Link href={routers.users} color="inherit">
                        <Button >
                            Account
                        </Button>
                    </Link>
                </>)}
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles(
    {
        root: {
            flexGrow: 1, color: `${theme.palette.info}`,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            color: `${theme.palette.info}`,

        },
    },
    {
        name: 'Header',
    }
)
