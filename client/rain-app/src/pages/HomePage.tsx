import ChatInitForm from '../components/ChatInitForm';
import Grid from '@mui/material/Unstable_Grid2';


function HomePage() {
  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <h1>The best Chat App you have ever seen!</h1>
      <ChatInitForm />
    </Grid>
  )
}

export default HomePage