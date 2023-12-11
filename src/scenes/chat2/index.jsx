import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField } from '@mui/material';
import Typography from 'components/Typography';
import { Send } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useGetUserByEmailQuery } from 'state/api';

const Chat2 = () => {
    const userEmail = useSelector((state) => state.global.userEmail);
    const {data, isLoading, isSuccess} = useGetUserByEmailQuery(userEmail);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (isSuccess && !isLoading) {
            setUserId(data.id);
        }
    }, [isSuccess]);

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography
                sx={{
                    fontWeight: 600,
                    marginTop: 2,
                    marginBottom: 2,
                    mx: '1rem',
                }}
                variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper}>
            <Grid item xs={3}>
                <List>
                    <ListItem key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="" src={data && data.profile? data.profile.profile_image: "Loading"} />
                        </ListItemIcon>
                        <ListItemText primary={data? data.full_name: "Loading"}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                {/* <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid> */}
                <Divider />
                <List>
                    <ListItem  key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem  key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem  key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><Send /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat2;