import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';

const card=() =>{
    return(
<Card >
<CardHeader

  title="Galaxia"
  subheader="Neptunian"
/>
<CardMedia
  imgage  = "Arte.jpg"
  title="Galaxian"
/>
<CardContent>
  <Typography variant="body2" color="textSecondary" component="p">
  «El arte es peligroso, el arte no es casto;no están hechos para el arte los inocentes ignorantes. El arte que es casto no es arte».
  </Typography>
</CardContent>
<CardActions disableSpacing>
</CardActions>
</Card>
);
}
export default card;