import React from "react"
import { Link, withRouter } from 'react-router-dom'

// import { Field, Formik } from 'formik'

import withStyles from "@material-ui/core/styles/withStyles"
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import styles from './styles'

type Props = {
  classes: Object,
  history: Object,
}

type State = {}

class Login extends React.Component<Props, State> {
  login = () => {
    const { history } = this.props

    localStorage.setItem('AUTH_TOKEN', 'asdf')

    history.push('/')
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.gridContainer}
        >
          <Grid item xs="auto">
            <Card>
              <CardHeader
                title="Login"
                align="center"
              />
              <CardContent>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Password"
                  margin="normal"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
              </CardContent>
              <CardActions
                className={classes.cardActions}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  onClick={this.login}
                >
                  Log In
                </Button>
                <Link to="/signup">
                  <Button color="primary">or Sign Up</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Login))
