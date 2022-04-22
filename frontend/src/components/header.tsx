import { AppBar, createTheme, IconButton, Link, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/node_modules/@material-ui/styles";
import { FC } from "react";
import { routers } from "../app/routers";

const theme = createTheme();

export const Header: FC = () => {
    const classes = useStyles(theme)
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                    {/* <MenuIcon /> */}
                </IconButton>
                <Link href={routers.main} color="secondary" className={classes.title}>
                    {/* <Typography variant="h6" className={classes.title}> */}
                    Main
                    {/* </Typography> */}
                </Link>
                <Link href={routers.registration} color="inherit">
                    {/* <Button color="inherit" onClick={() => <Link href={routers.registration} />}> */}
                    LOGIN
                    {/* </Button> */}
                </Link>
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: `${theme.palette.info}`
    },
}, {
    name: "Header"
})